'use strict';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { registerBlockType } = wp.blocks;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, RangeControl, ToggleControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

let isUpdated = false;

registerBlockType( 'snow-monkey-blocks/evaluation-star', {
	title: __( 'Evaluation star', 'snow-monkey-blocks' ),
	description: __( 'Evaluate with star icons', 'snow-monkey-blocks' ),
	icon: 'star-half',
	category: 'smb',
	attributes: {
		evaluationValue: {
			type: 'number',
			default: 3,
		},
		iconColor: {
			type: 'string',
		},
		isDisplayNumeric: {
			type: 'boolean',
			default: true,
		},
		numericAlign: {
			type: 'string',
			default: 'left',
		},
		numericColor: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes } ) {
		const { evaluationValue, iconColor, isDisplayNumeric, numericAlign, numericColor } = attributes;
		const renderEditEvaluationIcon = () => {
			const displayDefaultIcon = isUpdated ? 'none' : 'inline-block';
			const displayUpdatedIcon = isUpdated ? 'inline-block' : 'none';
			const defaultOutputIcons = [];
			const updatedOutputIcons = [];
			let evaluationNumber = Number( evaluationValue );
			if ( isNaN( evaluationNumber ) || evaluationNumber < 0 ) {
				evaluationNumber = 0;
			} else if ( evaluationNumber > 5 ) {
				evaluationNumber = 5;
			}
			const fillIconCount = Math.floor( evaluationNumber );
			const emptyIconCount = 5 - Math.ceil( evaluationNumber );
			const halfIconCount = ( fillIconCount + emptyIconCount ) === 5 ? 0 : 1;
			for ( let i = 0; i < fillIconCount; i++ ) {
				defaultOutputIcons.push( <FontAwesomeIcon icon={ [ 'fas', 'star' ] } /> );
				updatedOutputIcons.push( <i className="fas fa-star" /> );
			}
			if ( halfIconCount !== 0 ) {
				defaultOutputIcons.push( <FontAwesomeIcon icon={ [ 'fas', 'star-half-alt' ] } /> );
				updatedOutputIcons.push( <i className="fas fa-star-half-alt" /> );
			}
			for ( let j = 0; j < emptyIconCount; j++ ) {
				defaultOutputIcons.push( <FontAwesomeIcon icon={ [ 'far', 'star' ] } /> );
				updatedOutputIcons.push( <i className="far fa-star"></i> );
			}
			return (
				<Fragment>
					<div style={ { display: displayDefaultIcon } }>
						{ updatedOutputIcons }
					</div>
					<div style={ { display: displayUpdatedIcon } }>
						{ defaultOutputIcons }
					</div>
				</Fragment>
			);
		};
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Evaluation Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Evaluation', 'snow-monkey-blocks' ) }
							help={ __( 'Five-grade evaluation', 'snow-monkey-blocks' ) }
							value={ evaluationValue }
							onChange={ ( value ) => {
								if ( isNaN( value ) || value < 0 ) {
									value = 0;
								} else if ( value > 5 ) {
									value = 5;
								}
								isUpdated = true;
								setAttributes( { evaluationValue: value } );
							} }
							min={ 0 }
							max={ 5 }
							step={ 0.1 }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Icon Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Icon color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => {
									isUpdated = true;
									setAttributes( { iconColor: value } );
								} }
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody title={ __( 'Numeric Settings', 'snow-monkey-blocks' ) }>
						<ToggleControl
							label={ __( 'Show numeric', 'snow-monkey-blocks' ) }
							checked={ isDisplayNumeric }
							onChange={ ( value ) => setAttributes( { isDisplayNumeric: value } ) }
						/>
						<SelectControl
							label={ __( 'Numeric position', 'snow-monkey-blocks' ) }
							value={ numericAlign }
							onChange={ ( value ) => {
								isUpdated = true;
								setAttributes( { numericAlign: value } );
							} }
							options={ [
								{
									value: 'left',
									label: __( 'Position left', 'snow-monkey-blocks' ),
								},
								{
									value: 'right',
									label: __( 'Position right', 'snow-monkey-blocks' ),
								},
							] }
						/>
						<BaseControl label={ __( 'Numeric color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ numericColor }
								onChange={ ( value ) => {
									isUpdated = true;
									setAttributes( { numericColor: value } );
								} }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<div className="smb-evaluation-star">
					<div className="smb-evaluation-star__body">
						<span
							className={ `smb-evaluation-star__numeric smb-evaluation-star__numeric__${ numericAlign }` }
							style={ { color: numericColor, display: isDisplayNumeric ? 'inline' : 'none' } }
						>
							{ sprintf( '%.1f', Number( evaluationValue ) ) }
						</span>
						<div
							className="smb-evaluation-star__icon"
							style={ { color: iconColor } }
						>
							{ renderEditEvaluationIcon() }
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { evaluationValue, iconColor, isDisplayNumeric, numericAlign, numericColor } = attributes;
		const renderSaveEvaluationIcon = () => {
			const outputEvaluationIcons = [];
			let evaluationNumber = Number( evaluationValue );
			if ( isNaN( evaluationNumber ) || evaluationNumber < 0 ) {
				evaluationNumber = 0;
			} else if ( evaluationNumber > 5 ) {
				evaluationNumber = 5;
			}
			const fillIconCount = Math.floor( evaluationNumber );
			const emptyIconCount = 5 - Math.ceil( evaluationNumber );
			const halfIconCount = ( fillIconCount + emptyIconCount ) === 5 ? 0 : 1;
			for ( let i = 0; i < fillIconCount; i++ ) {
				outputEvaluationIcons.push( <i className="fas fa-star" /> );
			}
			if ( halfIconCount !== 0 ) {
				outputEvaluationIcons.push( <i className="fas fa-star-half-alt" /> );
			}
			for ( let j = 0; j < emptyIconCount; j++ ) {
				outputEvaluationIcons.push( <i className="far fa-star" /> );
			}
			return (
				<Fragment>
					{ outputEvaluationIcons }
				</Fragment>
			);
		};
		return (
			<div className="smb-evaluation-star">
				<div className="smb-evaluation-star__body">
					{ isDisplayNumeric &&
						<span
							className={ `smb-evaluation-star__numeric smb-evaluation-star__numeric__${ numericAlign }` }
							style={ { color: numericColor } }
						>
							{ sprintf( '%.1f', Number( evaluationValue ) ) }
						</span>
					}
					<div
						className="smb-evaluation-star__icon"
						style={ { color: iconColor } }
					>
						{ renderSaveEvaluationIcon() }
					</div>
				</div>
			</div>
		);
	},
} );
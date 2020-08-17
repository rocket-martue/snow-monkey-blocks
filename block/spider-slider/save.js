import classnames from 'classnames';

export default function( { attributes, className } ) {
	const {
		images,
		aspectRatio,
		arrows,
		dots,
		dotsToThumbnail,
		fade,
		displayCaption,
		interval,
	} = attributes;

	if ( ! images.length ) {
		return null;
	}

	const classes = classnames( 'smb-spider-slider', className, {
		[ `smb-spider-slider--${ aspectRatio }` ]: !! aspectRatio,
	} );

	return (
		<div
			className={ classes }
			data-fade={ fade ? 'true' : 'false' }
			data-interval={ 0 < interval ? interval * 1000 : undefined }
		>
			<div className="spider">
				<div className="spider__canvas">
					{ images.map( ( img, index ) => {
						return (
							<div
								className="spider__slide"
								data-id={ index }
								key={ index }
							>
								<img
									className="spider__figure"
									src={ img.url }
									alt={ img.alt }
									width={ img.width }
									height={ img.height }
									data-image-id={ img.id }
								/>

								{ displayCaption && !! img.caption && (
									<div className="smb-spider-slider__item">
										<div className="smb-spider-slider__item__caption">
											{ img.caption }
										</div>
									</div>
								) }
							</div>
						);
					} ) }
				</div>

				{ arrows && (
					<>
						<button className="spider__arrow" data-direction="prev">
							Prev
						</button>
						<button className="spider__arrow" data-direction="next">
							Next
						</button>
					</>
				) }
			</div>

			{ dots && (
				<div
					className="spider__dots"
					data-thumbnails={ dotsToThumbnail ? 'true' : 'false' }
				>
					{ images.map( ( img, index ) => {
						return (
							<button
								className="spider__dot"
								data-id={ index }
								key={ index }
							>
								{ dotsToThumbnail ? (
									<img
										className="spider__figure"
										src={ img.url }
										alt={ img.alt }
										width={ img.width }
										height={ img.height }
									/>
								) : (
									<>{ index }</>
								) }
							</button>
						);
					} ) }
				</div>
			) }
		</div>
	);
}

import * as maptilersdk from "@maptiler/sdk";

const popup = new maptilersdk.Popup({
	offset: 25,
	closeButton: false,
	closeOnClick: false,
})
	.setText(
		'LIDL'
	);

export const market = new maptilersdk.Marker({ color: '#0D6054' })
	.setLngLat([-8.842302779116778, 39.64599928964503])
	.setPopup(popup)
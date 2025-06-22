import * as maptilersdk from "@maptiler/sdk";

const popup = new maptilersdk.Popup({
	offset: 25,
	closeButton: false,
	closeOnClick: false,
})
	.setText(
		'Mosteiro da Batalha'
	);

export const church = new maptilersdk.Marker({ color: '#0D6054' })
	.setLngLat([-8.82609, 39.65835])
	.setPopup(popup)
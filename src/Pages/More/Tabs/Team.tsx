import React from "react";
import cross from "./../../../assets/cross.png";
import bread from "./../../../assets/bread.png";
import transportation from "./../../../assets/transportation.png";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";

export function Team() {
	return (
		<div className="w-full h-full overflow-y-scroll grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-16 justify-items-center">
			<div className="h-72 w-48 bg-gray-300 rounded-lg">
				<ImageCdn imageName={"people/ana_daniel.jpg"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">Ana Daniel</p>
			</div>
			<div className="h-72 w-48 bg-gray-300 rounded-lg ">
				<ImageCdn imageName={"people/diogo_ramalho.jpg"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">Diogo Ramalho</p>
			</div>
			<div className="h-72 w-48 bg-gray-300 rounded-lg ">
				<ImageCdn imageName={"people/filipe_cardoso.JPG"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">Filipe Cardoso</p>
			</div>
			<div className="h-72 w-48 bg-gray-300 rounded-lg ">
				<ImageCdn imageName={"people/henrique_moreira .jpg"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">Henrique Moreira</p>
			</div>
			<div className="h-72 w-48 bg-gray-300 rounded-lg ">
				<ImageCdn imageName={"people/joana_monteiro.jpg"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">Joana Monteiro</p>
			</div>
			<div className="h-72 w-48 bg-gray-300 rounded-lg ">
				<ImageCdn imageName={"people/joao_ferreira.jpg"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">João Ferreira</p>
			</div>
			<div className="h-72 w-48 bg-gray-300 rounded-lg ">
				<ImageCdn imageName={"people/luís_jorge .jpg"} className="w-full h-60 rounded-t-lg"/>
				<p className="w-full mt-2.5 flex justify-center items-center font-bold">Luís Jorge</p>
			</div>
		</div>
	)
}
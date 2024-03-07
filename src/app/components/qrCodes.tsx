import { QRCodeSVG } from "qrcode.react";
import { Button } from "./ui/Button";
import { FC, useEffect, useState } from "react";
import { FormItems } from "../lib/formTypes";
import Paragraph from "./ui/Paragraph";

interface QRCodesProps {
    data: Array<FormItems>
}

const QRCodes: FC<QRCodesProps> = ({ data } ) => {
    const ARRAY_SIZE = 5

    const generateQRCodes = (data: Array<FormItems>) => {
		var array = []

		for (var i = 0; i < data.length; i += ARRAY_SIZE) {
			array.push(data.slice(i, i + ARRAY_SIZE))
		}
		console.log(array)
		return array
		
	}

	const [currentQR, setCurrentQR] = useState(0)
    const [qrData, setQRData] = useState<Array<FormItems>>()
    const [rendered, setRendered] = useState(false)

    const qrStuff = generateQRCodes(data)

    useEffect(() => {
        setQRData(generateQRCodes(data)[currentQR])
    }, [currentQR])


    useEffect(() => {
        setRendered(!rendered)
    }, [])

	return (
        <>
            <div className="relative">  
                <Button className="absolute w-48 h-full bg-transparent focus:ring-0" onClick={() => currentQR > 0 ? setCurrentQR(currentQR - 1) : null}></Button>
                <Button className="absolute w-48 h-full right-0 bg-transparent focus:ring-0" onClick={() => currentQR < qrStuff.length - 1 ? setCurrentQR(currentQR + 1) : null}></Button>
                {rendered ? <QRCodeSVG className={"w-96 h-96"}value={JSON.stringify(qrData)} /> : null}
            </div>
            {rendered ? <Paragraph>{currentQR} of {qrStuff.length - 1}</Paragraph> : null}
        </>


	);

};

export default QRCodes;
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./ui/Button";
import { FC, useEffect, useRef, useState } from "react";
import { FormItems } from "../lib/formTypes";
import Paragraph from "./ui/Paragraph";

interface QRCodesProps {
    data: Array<FormItems>
    dispatch: Function
}

const QRCodes: FC<QRCodesProps> = ({ data, dispatch } ) => {
    const ARRAY_SIZE = 5 

    const generateQRCodes = (data: Array<FormItems>) => {
		var array = []

		for (var i = 0; i < data.length; i += ARRAY_SIZE) {
			array.push(data.slice(i, i + ARRAY_SIZE))
		}
		return array
		
	}

	const [currentQR, setCurrentQR] = useState(0)
    const [qrData, setQRData] = useState<Array<FormItems>>()
    const [rendered, setRendered] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const qrStuff = generateQRCodes(data)

    useEffect(() => {
        setQRData(generateQRCodes(data)[currentQR])
    }, [currentQR, data])


    useEffect(() => {
        setRendered(!rendered)
    }, [])

    const textArea = useRef<any>(<div></div>)

    const handleSubmit = (payload: string) => {
        console.log(payload)
        JSON.parse(payload).map((val: FormItems) => {
            dispatch({ type: "added", payload: val})
        })
        textArea.current.value = ""
        

    }
    
	return (
        <div className="flex flex-col items-center w-96">
            <div className="relative bg-slate-100">  
                <Button className="absolute w-48 h-full bg-transparent focus:ring-0" onClick={() => currentQR > 0 ? setCurrentQR(currentQR - 1) : null}></Button>
                <Button className="absolute w-48 h-full right-0 bg-transparent focus:ring-0" onClick={() => currentQR < qrStuff.length - 1 ? setCurrentQR(currentQR + 1) : null}></Button>
                {rendered && qrData != undefined ? <QRCodeSVG className={"w-96 h-96"}value={JSON.stringify(qrData)} /> : <Paragraph className="text-b-100 text-center p-2 rounded w-96 h-96">{"Nothing to display :<"}</Paragraph>}
            </div>
            {rendered ? <Paragraph className="text-center text-b-100">{currentQR + 1} of {qrStuff.length}</Paragraph> : null}
            <textarea className="w-full rounded bg-slate-300 h-32" ref={textArea}/>
            <div className="flex items-between">

                <Button className="" onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>Copy ALL Data</Button>
                <Button className="" onClick={() => handleSubmit(textArea.current.value)}>Import Log</Button>
                <Button onClick={() => setDeleteOpen(!deleteOpen)}>Delte All</Button>
            </div>
            {deleteOpen && <Button onClick={() => {dispatch({type: "set", payload: []}); setDeleteOpen(false)} }>Ja sure?</Button>}
        </div>


	);

};

export default QRCodes;
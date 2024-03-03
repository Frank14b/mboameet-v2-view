import { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import Cropper, { Area, Point } from 'react-easy-crop';
import { dismissType } from '@material-tailwind/react/types/generic';
import { getCroppedImg } from '@/app/lib/cropImage';

export default function CropProfileImage({ image, croppedImage, returnType }: { image: string, croppedImage: (image: string | Blob) => any, returnType: string }) {

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1.1)
    const [cropArea, setCropArea] = useState<Area>({ x: 0, y: 0, height: 0, width: 0 })
    const [open, setOpen] = useState<boolean>(true);
    const handleOpen = () => setOpen(false);

    useEffect(() => {
        setOpen(true);
    }, [image])

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCropArea(croppedAreaPixels);
    }
    
    const handleCropImage = async (data: Area) => {
        const croppedImg: any = await getCroppedImg({imageSrc: image, pixelCrop: data, fileType: returnType});
        croppedImage(croppedImg);
    }

    const dismiss:dismissType = {
        enabled: false,
        escapeKey: false,
    }

    return <>
        <Dialog dismiss={dismiss} placeholder={""} open={open} handler={handleOpen}>
            <DialogHeader placeholder={""} className='dark:bg-gray-800 text-md'>Crop your image</DialogHeader>
            <DialogBody placeholder={""} style={{height: "600px"}}>
                {/*  */}
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropSize={{width: 400, height: 400}}
                />
                {/*  */}
            </DialogBody>
            <DialogFooter placeholder={""} className='dark:bg-gray-800'>
                <Button
                    placeholder={""}
                    variant="gradient"
                    color="red"
                    onClick={() => setOpen(false)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button placeholder={""} variant="gradient" color="pink" onClick={() => handleCropImage(cropArea)}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </>
}
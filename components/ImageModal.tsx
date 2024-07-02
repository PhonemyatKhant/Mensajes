import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }
  return (
    <AlertDialogContent className=" w-80 h-80">
      
        <AlertDialogHeader>
          <Image className="  object-contain" fill alt="Image" src={src} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {" "}
            <X onClick={() => onClose} className=" p-6" />
          </AlertDialogCancel>
        </AlertDialogFooter>
      
    </AlertDialogContent>
  );
};

export default ImageModal;

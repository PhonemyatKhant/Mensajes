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
import { TriangleAlert } from "lucide-react";

interface AlertDialogComponentProps {
  type: "success" | "destructive";
  title?: string;
  desc?: string;
  action: () => void;
}

const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
  type,
  title,
  desc,
  action,
}) => {
  return (
    <AlertDialogContent className=" text-destructive">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <div className=" text-destructive rounded-full p-2 flex justify-center items-center bg-destructive/30">
            <TriangleAlert />
          </div>
          {title ? title : "Are you absolutely sure?"}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {`This action cannot be undone. This will permanently delete your
          ${desc} and remove your data from our servers.`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => action()}
          className="bg-destructive/90 hover:bg-destructive"
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertDialogComponent;

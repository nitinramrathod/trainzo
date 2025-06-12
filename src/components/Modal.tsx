'use client'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
} from "@/components/ui/dialog";
// import Button from "./forms/Button";

export function ModalBox({ open, setOpen, children }: { open: boolean; setOpen: (value: boolean) => void; children:React.ReactNode }) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[992px] max-h-[90vh]">         
          <div className="grid gap-4 py-4 overflow-y-auto">
            {children}
          </div>
          {/* <DialogFooter>
            <Button onClick={() => setOpen(false)}>
              Save changes
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    );
  }
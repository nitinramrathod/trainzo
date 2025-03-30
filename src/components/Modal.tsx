'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "./forms/Button";

export function ModalBox({ open, setOpen, children }: { open: boolean; setOpen: (value: boolean) => void; children:any }) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[992px]">         
          <div className="grid gap-4 py-4">
            {children}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
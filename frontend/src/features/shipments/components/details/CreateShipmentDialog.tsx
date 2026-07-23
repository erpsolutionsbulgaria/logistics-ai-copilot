import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError, FieldDescription, FieldGroup } from "@/components/ui/field";

type CreateShipmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CreateShipmentDialog({open, onOpenChange}: CreateShipmentDialogProps) {
//   const navigate = useNavigate();

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // Тук по-късно ще извикаме create shipment mutation-а.
        console.log("Create shipment");

        // След успешното създаване:
        // onOpenChange(false);
    }

    function handleCancel() {
        onOpenChange(false);
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}
    >
  <DialogContent className="sm:max-w-xl">
    <DialogHeader>
      <DialogTitle>Create shipment</DialogTitle>
      <DialogDescription>
        Add the basic details for a new shipment.
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="referenceNumber">
            Reference number
          </FieldLabel>

          <Input
            id="referenceNumber"
            name="referenceNumber"
            placeholder="SHP-2026-001"
          />

          <FieldError />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="origin">
              Origin
            </FieldLabel>

            <Input
              id="origin"
              name="origin"
              placeholder="Sofia, Bulgaria"
            />

            <FieldError />
          </Field>

          <Field>
            <FieldLabel htmlFor="destination">
              Destination
            </FieldLabel>

            <Input
              id="destination"
              name="destination"
              placeholder="Berlin, Germany"
            />

            <FieldError />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="transportMode">
            Transport mode
          </FieldLabel>

          <Select name="transportMode">
            <SelectTrigger id="transportMode">
              <SelectValue placeholder="Select transport mode" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="air">Air</SelectItem>
              <SelectItem value="sea">Sea</SelectItem>
              <SelectItem value="rail">Rail</SelectItem>
            </SelectContent>
          </Select>

          <FieldError />
        </Field>

        <Field>
          <FieldLabel htmlFor="notes">
            Notes
          </FieldLabel>

          <Textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Additional shipment information..."
          />

          <FieldDescription>
            Optional notes or special handling instructions.
          </FieldDescription>

          <FieldError />
        </Field>

        {/* Future feature */}

        {/*
        <Field>
          <FieldLabel>Documents</FieldLabel>

          <FieldDescription>
            Upload a CMR, invoice or other transport document.
          </FieldDescription>

          <Dropzone />

          <FieldError />
        </Field>
        */}
      </FieldGroup>

      <DialogFooter className="mt-8">
        <Button variant="outline" type="button" onClick={handleCancel}>
          Cancel
        </Button>

        <Button type="submit">
          Create shipment
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
  );
}

export default CreateShipmentDialog;
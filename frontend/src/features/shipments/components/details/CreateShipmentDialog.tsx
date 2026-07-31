import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useCreateShipment } from "../../hooks/use-create-shipment";

import {
  createShipmentSchema,
  type CreateShipmentFormValues,
} from "@/features/shipments/schemas/create-shipment-schema";

type CreateShipmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CreateShipmentDialog({open, onOpenChange}: CreateShipmentDialogProps) {
  // const navigate = useNavigate();
  const createShipmentMutation = useCreateShipment();

    const {
      handleSubmit,
      register,
      reset,
      // formState: { errors },
    } = useForm<CreateShipmentFormValues>({
      resolver: zodResolver(createShipmentSchema),
      defaultValues: {
        reference: "",
        clientName: "",
        origin: "",
        destination: "",
        transportMode: undefined,
        notes: "",
      },
    });

    function onSubmit(data: CreateShipmentFormValues) {
        createShipmentMutation.mutate(data, {
            onSuccess: () => {
              reset();
              onOpenChange(false);
            },
          });
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

    <form onSubmit={handleSubmit(onSubmit, (err) => {
      console.log(' ERR ', err)
    })}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="referenceNumber">
            Reference number
          </FieldLabel>

          <Input
            id="reference"
            placeholder="SHP-2026-001"
            {...register("reference")}
          />

          <FieldError />
        </Field>

        <Field>
          <FieldLabel htmlFor="clientName">
            Client name
          </FieldLabel>

          <Input
            id="clientName"
            placeholder="Acme Logistics"
            {...register("clientName")}
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
              placeholder="Sofia, Bulgaria"
              {...register("origin")}
            />

            <FieldError />
          </Field>

          <Field>
            <FieldLabel htmlFor="destination">
              Destination
            </FieldLabel>

            <Input
              id="destination"
              placeholder="Berlin, Germany"
              {...register("destination")}
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

        {createShipmentMutation.isError && (
          <p className="text-sm text-destructive">
            Failed to create shipment.
          </p>
        )}

        <Button variant="outline" type="button" onClick={handleCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={createShipmentMutation.isPending}>
          {createShipmentMutation.isPending
              ? "Creating..."
              : "Create shipment"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
  );
}

export default CreateShipmentDialog;
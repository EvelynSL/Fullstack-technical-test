import { useMutation } from "@tanstack/react-query";
import { createItem, updateItem } from "../api/items";
import queryClient from "../queryClient";
import { toast } from "sonner";
import { capitalize, inputClass, ItemCreateSchema, type Item } from "../lib/utils";

interface ItemFormProps {
  onClose: () => void;
  selectedItem?: Item | null;
}

export const ItemForm = ({ onClose, selectedItem }: ItemFormProps) => {

  const addingItem = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success("Item created successfully")
      onClose()
    },
  })

  const editingItem = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Item, "id"> }) =>
      updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item updated successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to update item");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
  
    const item = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
    }
  
    const result = ItemCreateSchema.safeParse(item)
  
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(`${capitalize(err.path[0] as string)}: ${err.message}`)
      })
      return
    }
  
    if (selectedItem?.id) {
      await editingItem.mutate({ id: selectedItem?.id as number, data: result.data as Item });
      return
    } else {
      await addingItem.mutate(result.data as Item);
    }
  }

  const fetching = addingItem.isPending || editingItem.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        defaultValue={selectedItem?.name || ""}
        placeholder="Name"
        disabled={fetching}
        required
        className={inputClass}
      />
      <input
        type="text"
        name="description"
        disabled={fetching}
        defaultValue={selectedItem?.description || ""}
        placeholder="Description"
        className={inputClass}
      />
      <input
        type="number"
        name="price"
        defaultValue={selectedItem?.price || 0}
        placeholder="Price"
        required
        disabled={fetching}
        min="0"
        step="0.01"
        className={inputClass}
      />
      <input
        type="text"
        name="category"
        defaultValue={selectedItem?.category || ""}
        placeholder="Category"
        required   
        disabled={fetching}
        className={inputClass}
      />

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={fetching}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          disabled={fetching}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

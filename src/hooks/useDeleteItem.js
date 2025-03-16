import { useMutation, useQueryClient } from "react-query";
import { deleteItem as deleteItemApi } from "./../services/apiItems";
import toast from "react-hot-toast";

function useDeleteItem() {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isLoading: isDeletingItem } = useMutation({
    mutationFn: deleteItemApi,
    onSuccess: () => {
      // toast.success("Item successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { deleteItem, isDeletingItem };
}

export default useDeleteItem;

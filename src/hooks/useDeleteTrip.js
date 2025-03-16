import { useMutation, useQueryClient } from "react-query";
import { deleteTrip as deleteTripApi } from "./../services/apiTrips";
import toast from "react-hot-toast";

function useDeleteTrip(onError) {
  const queryClient = useQueryClient();

  const { mutate: deleteTrip, isLoading: isDeletingTrip } = useMutation({
    mutationFn: deleteTripApi,
    onSuccess: () => {
      // toast.success("Trip successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },

    onError: (err) => {
      onError?.();
      toast.error(err.message);
    },
  });

  return { deleteTrip, isDeletingTrip };
}

export default useDeleteTrip;

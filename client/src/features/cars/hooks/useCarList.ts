import { useQuery } from "@apollo/client/react";
import { useEffect, useRef, useCallback } from "react";
import { useQueryState } from "nuqs";
import { GET_ALL_CARS } from "../queries";
import type { GetAllCarsQuery } from "@/generated/graphql";

export const useCarList = () => {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [sort] = useQueryState("sort", { defaultValue: "" });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const sortField = sort?.split("-")[0];
  const sortOrder = sort?.split("-")[1];

  const { loading, error, data, fetchMore } = useQuery<GetAllCarsQuery>(
    GET_ALL_CARS,
    {
      variables: {
        limit: 12,
        offset: 0,
        sort: { field: sortField || "carName", order: sortOrder || "asc" },
        filter: { search: search || "" },
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  // Load more funkcija
  const loadMoreCars = useCallback(async () => {
    if (loading || !data?.getAllCars?.hasMore) return;

    try {
      await fetchMore({
        variables: {
          limit: 12,
          offset: data.getAllCars.items.length,
          sort: { field: sortField || "carName", order: sortOrder || "asc" },
          filter: { search: search || "" },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            getAllCars: {
              ...fetchMoreResult.getAllCars,
              items: [
                ...prev.getAllCars.items,
                ...fetchMoreResult.getAllCars.items,
              ],
            },
          };
        },
      });
    } catch (error) {
      console.error("Error loading more cars:", error);
    }
  }, [
    loading,
    data?.getAllCars?.hasMore,
    data?.getAllCars?.items?.length,
    fetchMore,
    sortField,
    sortOrder,
    search,
  ]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          data?.getAllCars?.hasMore &&
          !loading
        ) {
          loadMoreCars();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [data?.getAllCars?.hasMore, loading, loadMoreCars]);

  return {
    loading,
    error,
    data,
    loadMoreRef,
    carsToRender: data?.getAllCars?.items || [],
    hasMore: data?.getAllCars?.hasMore || false,
  };
};

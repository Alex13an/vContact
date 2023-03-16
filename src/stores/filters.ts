import type { Filter } from "@/models/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFiltersStore = defineStore("filters", () => {
  const filters = ref<Filter[]>([]);
  const isFilterStrict = ref<boolean>(false);

  const setStrictMode = (mode: boolean): void => {
    if (mode === true) {
      filters.value = filters.value.filter((f, index, self) => {
        if (f.type === "tags") {
          return true;
        }
        return self.findIndex((i) => i.type === f.type) === index;
      });
    } else {
      filters.value = [...filters.value];
    }
    isFilterStrict.value = mode;
  };

  const addFilter = (addedFilter: Filter): void => {
    if (isFilterStrict.value && filters.value.some((f) => f.type === addedFilter.type) && addedFilter.type !== "tags") {
      filters.value = filters.value.map((f) => {
        if (f.type !== "tags" && f.type === addedFilter.type) {
          return addedFilter;
        }
        return f;
      });
      return;
    }
    filters.value.push(addedFilter);
  };

  const removeFilter = (removedFilter: Filter): void => {
    filters.value = filters.value.filter((f) => {
      return !(f.value === removedFilter.value && f.type === removedFilter.type);
    });
  };

  return { filters, addFilter, removeFilter, isFilterStrict, setStrictMode };
});

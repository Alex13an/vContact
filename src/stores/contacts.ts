import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useFiltersStore } from "./filters";
import { useMockApiStore } from "./mockApi";
import type { Contact } from "@/models/types";

export const useContactsStore = defineStore("contacts", () => {
  const mockApi = useMockApiStore();
  const filtersStore = useFiltersStore();
  const contacts = ref<Contact[]>([]);

  const getContacts = async () => {
    if (filtersStore.filters.length) {
      getFilteredContacts();
      return;
    }
    const res = await mockApi.getContacts();
    contacts.value = [...res];
  };

  const getFilteredContacts = async () => {
    const res = await mockApi.getFilteredContacts(filtersStore.filters, filtersStore.isFilterStrict);
    contacts.value = [...res];
  };

  watch(
    () => [...filtersStore.filters],
    async (newFilters) => {
      if (newFilters.length) {
        await getFilteredContacts();
        return;
      }
      await getContacts();
    },
    { deep: true }
  );

  const getContact = async (id: number) => {
    const contact = await mockApi.getContact(id);

    return contact;
  };

  const saveContact = async (contact: Contact) => {
    await mockApi.saveContact(contact);
  };

  const deleteContact = async (id: number) => {
    await mockApi.deleteContact(id);
  };

  const addContact = async (contact: Contact) => {
    await mockApi.addContact(contact);
  };

  return { contacts, getContacts, getFilteredContacts, getContact, saveContact, deleteContact, addContact };
});

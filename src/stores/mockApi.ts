import type { Contact, Filter } from "@/models/types";
import { defineStore } from "pinia";

const hardcodeList: Contact[] = [
  {
    id: 1,
    name: "Nodirbek Abdusattorov",
    phone: "+998 (99) 322-22-28",
    email: "iLoveCookies@gmail.com",
    tags: ["bro", "goodman", "gym"],
  },
  {
    id: 2,
    name: "Jamila Baghirova",
    phone: "+998 (99) 322-22-28",
    email: "beynalxalqs@gmail.com",
    tags: ["mom", "family", "food"],
  },
  {
    id: 3,
    name: "Amel Karboul",
    phone: "+998 (99) 322-22-28",
    email: "office@edufundmea.org",
    tags: ["partner", "work", "bro"],
  },
];

const API_DELAY = 100;

export const useMockApiStore = defineStore("mockApi", () => {
  const getMockApiContacts = (): Contact[] => {
    const localContacts = localStorage.getItem("contacts");
    if (localContacts) {
      return JSON.parse(localContacts);
    }
    return hardcodeList;
  };

  const setMockApiContacts = (contacts: Contact[]) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const getContacts = (): Promise<Contact[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = getMockApiContacts();
        setMockApiContacts(res);
        resolve(res);
      }, API_DELAY);
    });
  };

  const getContact = (id: number): Promise<Contact | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contacts = getMockApiContacts();
        const contact = contacts.find((c) => c.id === id) || null;

        resolve(contact);
      }, API_DELAY);
    });
  };

  const getFilteredContacts = (filters: Filter[], isStrict: boolean): Promise<Contact[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contacts = getMockApiContacts();

        if (!isStrict) {
          const res = contacts.filter((contact) => {
            if (
              filters.some(
                (f) =>
                  f.type !== "tags" &&
                  (contact[f.type].includes(f.value) || contact[f.type].toLowerCase().includes(f.value))
              )
            ) {
              return true;
            }
            if (filters.some((f) => f.type === "tags" && contact.tags.some((t) => t === f.value))) {
              return true;
            }
            return false;
          });
          resolve(res);
          return;
        }

        const strictFilter = {
          name: filters.find((f) => f.type === "name")?.value || "",
          phone: filters.find((f) => f.type === "phone")?.value || "",
          email: filters.find((f) => f.type === "email")?.value || "",
          tags: filters.filter((f) => f.type === "tags").map((f) => f.value),
        };
        const res = contacts.filter((contact) => {
          if (
            (contact.name.includes(strictFilter.name) || contact.name.toLowerCase().includes(strictFilter.name)) &&
            (contact.phone.includes(strictFilter.phone) || contact.phone.toLowerCase().includes(strictFilter.phone)) &&
            (contact.email.includes(strictFilter.email) || contact.email.toLowerCase().includes(strictFilter.email)) &&
            strictFilter.tags.every((t) => contact.tags.includes(t))
          ) {
            return true;
          }
          return false;
        });
        resolve(res);
      }, API_DELAY);
    });
  };

  const saveContact = (contact: Contact): Promise<Contact> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contacts = getMockApiContacts();

        if (!contacts.find((c) => c.id === contact.id)) {
          contacts.push(contact);
          setMockApiContacts(contacts);
        } else {
          setMockApiContacts(
            contacts.map((c) => {
              if (c.id === contact.id) {
                return contact;
              }
              return c;
            })
          );
        }

        resolve(contact);
      }, API_DELAY);
    });
  };

  const addContact = (contact: Contact): Promise<Contact> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contacts = getMockApiContacts();
        const newId = contacts.length + 1;

        contacts.push({ ...contact, id: newId });
        setMockApiContacts(contacts);

        resolve(contact);
      }, API_DELAY);
    });
  };

  const deleteContact = (id: number): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contacts = getMockApiContacts();

        if (!contacts.find((c) => c.id === id)) {
          resolve(0);
          return;
        }

        setMockApiContacts(
          contacts.filter((c) => {
            if (c.id === id) {
              return false;
            }
            return true;
          })
        );

        resolve(id);
      }, API_DELAY);
    });
  };

  return { getContacts, getContact, getFilteredContacts, setMockApiContacts, saveContact, deleteContact, addContact };
});

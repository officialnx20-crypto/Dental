import { db } from "./firebase";
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  setDoc
} from "firebase/firestore";
import { 
  users, type User, type InsertUser, 
  services, type Service, type InsertService, 
  doctors, type Doctor, type InsertDoctor, 
  gallery, type GalleryItem, type InsertGalleryItem, 
  appointments, type Appointment, type InsertAppointment, 
  settings, type Setting, type InsertSetting 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: InsertService): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Doctors
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: number): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  updateDoctor(id: number, doctor: InsertDoctor): Promise<Doctor>;
  deleteDoctor(id: number): Promise<void>;

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryImages(): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  createGalleryImage(item: InsertGalleryItem): Promise<GalleryItem>;
  deleteGalleryItem(id: number): Promise<void>;
  deleteGalleryImage(id: string | number): Promise<void>;

  // Appointments
  getAppointments(): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment>;

  // Settings
  getSettings(): Promise<Setting>;
  updateSettings(setting: InsertSetting): Promise<Setting>;
}

export class FirebaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const docRef = doc(db, "users", id.toString());
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as User) : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return undefined;
    return querySnapshot.docs[0].data() as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = Date.now();
    const user: User = { ...insertUser, id };
    await setDoc(doc(db, "users", id.toString()), user);
    return user;
  }

  async getServices(): Promise<Service[]> {
    const querySnapshot = await getDocs(collection(db, "services"));
    return querySnapshot.docs.map(doc => doc.data() as Service);
  }

  async getService(id: number): Promise<Service | undefined> {
    const docRef = doc(db, "services", id.toString());
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Service) : undefined;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = Date.now();
    const service: Service = { ...insertService, id };
    await setDoc(doc(db, "services", id.toString()), service);
    return service;
  }

  async updateService(id: number, insertService: InsertService): Promise<Service> {
    const service: Service = { ...insertService, id };
    await setDoc(doc(db, "services", id.toString()), service);
    return service;
  }

  async deleteService(id: number): Promise<void> {
    await deleteDoc(doc(db, "services", id.toString()));
  }

  async getDoctors(): Promise<Doctor[]> {
    const querySnapshot = await getDocs(collection(db, "doctors"));
    return querySnapshot.docs.map(doc => doc.data() as Doctor);
  }

  async getDoctor(id: number): Promise<Doctor | undefined> {
    const docRef = doc(db, "doctors", id.toString());
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Doctor) : undefined;
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = Date.now();
    const doctor: Doctor = { ...insertDoctor, id };
    await setDoc(doc(db, "doctors", id.toString()), doctor);
    return doctor;
  }

  async updateDoctor(id: number, insertDoctor: InsertDoctor): Promise<Doctor> {
    const doctor: Doctor = { ...insertDoctor, id };
    await setDoc(doc(db, "doctors", id.toString()), doctor);
    return doctor;
  }

  async deleteDoctor(id: number): Promise<void> {
    await deleteDoc(doc(db, "doctors", id.toString()));
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    const querySnapshot = await getDocs(collection(db, "gallery"));
    return querySnapshot.docs.map(doc => doc.data() as GalleryItem);
  }

  async getGalleryImages(): Promise<GalleryItem[]> {
    return this.getGalleryItems();
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = Date.now();
    const item: GalleryItem = { ...insertItem, id };
    await setDoc(doc(db, "gallery", id.toString()), item);
    return item;
  }

  async createGalleryImage(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    return this.createGalleryItem(insertItem);
  }

  async deleteGalleryItem(id: number): Promise<void> {
    await deleteDoc(doc(db, "gallery", id.toString()));
  }

  async deleteGalleryImage(id: string | number): Promise<void> {
    await deleteDoc(doc(db, "gallery", id.toString()));
  }

  async getAppointments(): Promise<Appointment[]> {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      } as Appointment;
    });
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = Date.now();
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      status: "pending", 
      createdAt: new Date() 
    };
    await setDoc(doc(db, "appointments", id.toString()), appointment);
    return appointment;
  }

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
    const docRef = doc(db, "appointments", id.toString());
    await updateDoc(docRef, { status });
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Appointment;
  }

  async getSettings(): Promise<Setting> {
    try {
      const docRef = doc(db, "settings", "global");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          id: Number(data.id || 1),
          maintenanceMode: Boolean(data.maintenanceMode ?? data.websiteMode === "Private"),
        } as Setting;
      }
    } catch (error) {
      console.error("Error fetching settings from Firebase:", error);
    }
    
    const defaultSetting: Setting = {
      id: 1,
      clinicName: "Singla Dental Clinic",
      adminSecretKey: "admin123",
      contactEmail: "contact@singladental.com",
      contactPhone: "+91 9876543210",
      address: "Main Market, Near City Hospital",
      maintenanceMode: false
    };
    return defaultSetting;
  }

  async updateSettings(insertSetting: InsertSetting): Promise<Setting> {
    const setting: any = { ...insertSetting };
    if (setting.id) {
      setting.id = Number(setting.id);
    } else {
      setting.id = 1;
    }
    await setDoc(doc(db, "settings", "global"), setting);
    return setting as Setting;
  }
}

export const storage = new FirebaseStorage();

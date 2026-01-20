import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPData {
  id: string;
  name: string;
  attendance: 'yes' | 'no';
  guests: number;
  message?: string;
  timestamp: Timestamp;
}

export interface RSVPFormData {
  name: string;
  attendance: 'yes' | 'no';
  guests: number;
  message?: string;
}

// Collection reference
const RSVP_COLLECTION = 'rsvps';

// Submit RSVP to Firestore
export const submitRSVP = async (formData: RSVPFormData): Promise<string> => {
  try {
    const rsvpData = {
      ...formData,
      timestamp: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, RSVP_COLLECTION), rsvpData);
    console.log('RSVP submitted with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting RSVP: ', error);
    throw new Error('Failed to submit RSVP. Please try again.');
  }
};

// Get all RSVPs (for admin purposes)
export const getAllRSVPs = async (): Promise<RSVPData[]> => {
  try {
    const q = query(
      collection(db, RSVP_COLLECTION), 
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const rsvps: RSVPData[] = [];
    querySnapshot.forEach((doc) => {
      rsvps.push({ 
        id: doc.id,
        ...doc.data() 
      } as RSVPData);
    });
    
    return rsvps;
  } catch (error) {
    console.error('Error fetching RSVPs: ', error);
    throw new Error('Failed to fetch RSVPs.');
  }
};

// Get RSVP statistics
export const getRSVPStats = async () => {
  try {
    const rsvps = await getAllRSVPs();
    
    const attending = rsvps.filter(rsvp => rsvp.attendance === 'yes');
    const notAttending = rsvps.filter(rsvp => rsvp.attendance === 'no');
    const totalGuests = attending.reduce((sum, rsvp) => sum + rsvp.guests, 0);
    
    return {
      totalResponses: rsvps.length,
      attending: attending.length,
      notAttending: notAttending.length,
      totalGuests,
      attendingPercentage: rsvps.length > 0 ? Math.round((attending.length / rsvps.length) * 100) : 0
    };
  } catch (error) {
    console.error('Error calculating RSVP stats: ', error);
    throw new Error('Failed to calculate RSVP statistics.');
  }
};

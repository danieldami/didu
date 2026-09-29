import { Property, UserProfile } from '../types';

export interface LeadSubmission {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  phone: string;
  email: string;
  preferredTime: string;
  timestamp: string;
}

export const ADMIN_CREDENTIALS = [
  {
    email: 'amara@diduhomes.com',
    password: 'demo123',
    name: 'Amara Okafor',
    phone: '+234 803 555 0148',
    id: 'DIDU-ADMIN-01',
    role: 'admin' as const
  },
  {
    email: 'tunde@diduhomes.com',
    password: 'demo123',
    name: 'Tunde Adebayo',
    phone: '+234 809 555 0182',
    id: 'DIDU-ADMIN-02',
    role: 'admin' as const
  }
];

export const isAdmin = (user: UserProfile | null): boolean => {
  if (!user) return false;
  const emailLower = user.email?.toLowerCase().trim();
  const phoneClean = user.phone ? user.phone.replace(/[^0-9]/g, '') : '';
  return (
    user.role === 'admin' ||
    emailLower === 'amara@diduhomes.com' ||
    emailLower === 'tunde@diduhomes.com' ||
    phoneClean.endsWith('8035550148') ||
    phoneClean.endsWith('8095550182')
  );
};

export const isPropertyOwner = (property: Property | null, user: UserProfile | null): boolean => {
  if (!property || !user) return false;
  if (isAdmin(user)) return true;

  const uId = user.id?.trim();
  const uEmail = user.email?.trim().toLowerCase();
  const uPhone = user.phone ? user.phone.replace(/[^0-9]/g, '') : '';
  const uName = user.name?.trim().toLowerCase();

  const pOwnerId = property.ownerId?.trim();
  const pUserId = property.userId?.trim();
  const pPostedById = property.postedBy?.id?.trim();
  const pEmail = property.ownerEmail?.trim().toLowerCase();
  const pPostedByEmail = property.postedBy?.email?.trim().toLowerCase();
  const pPhone = property.ownerContact ? property.ownerContact.replace(/[^0-9]/g, '') : '';
  const pOwnerName = property.ownerName?.trim().toLowerCase();
  const pPostedByName = property.postedBy?.name?.trim().toLowerCase();

  const matchId = Boolean(uId && (pOwnerId === uId || pUserId === uId || pPostedById === uId));
  const matchEmail = Boolean(
    (uEmail && pEmail && pEmail === uEmail) || 
    (uEmail && pPostedByEmail && pPostedByEmail === uEmail)
  );
  const matchPhone = Boolean(
    uPhone && pPhone && 
    (pPhone === uPhone || pPhone.endsWith(uPhone) || uPhone.endsWith(pPhone))
  );
  const matchName = Boolean(
    uName && ((pOwnerName && pOwnerName === uName) || (pPostedByName && pPostedByName === uName))
  );

  return matchId || matchEmail || matchPhone || matchName;
};

export const isPropertyOwnerOrAdmin = (property: Property | null, user: UserProfile | null): boolean => {
  return isAdmin(user) || isPropertyOwner(property, user);
};

export const getMaskedProperty = (property: Property, user: UserProfile | null): Property => {
  if (isAdmin(user)) {
    return property;
  }
  
  // For non-admin accounts (buyers, guests, and owners on public/catalog views), mask sensitive details:
  // Show ONLY the primary area locality, hide exact street address & coordinates
  const primaryLocality = property.locality 
    ? (property.locality.toLowerCase().includes('lagos') ? property.locality : `${property.locality}, Lagos`)
    : (property.location || 'Lagos');

  return {
    ...property,
    address: primaryLocality,
    coordinates: { lat: 27.1767, lng: 78.0081 },
    ownerContact: undefined,
    agent: {
      name: 'DIDU Homes Concierge',
      role: 'Senior Advisory Desk',
      phone: '+234 803 555 0148',
      email: 'hello@diduhomes.com',
      avatar: property.agent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experience: 'Verified Luxury Advisory'
    }
  };
};

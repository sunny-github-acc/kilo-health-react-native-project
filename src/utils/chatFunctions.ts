interface UIDInterface {
  memberUID: string;
  uid: string;
}

export const uidString = ({ memberUID, uid }: UIDInterface) => {
  if (uid > memberUID) return uid + memberUID;
  return memberUID + uid;
};

export const sortChat = (a: { createdAt: number }, b: { createdAt: number }) =>
  a.createdAt < b.createdAt ? 0 : -1;

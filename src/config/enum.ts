export function setRoleName(role: number) {
  return roleMapping[role] || "";
}

export const roleMapping: { [key: number]: string } = {
  1: "admin", //Admin
  2: "hospital", //Nodal - Portal
  3: "doctor", //DEO
  4: "action", //Action Taker Office
  5: "user", //Invited User
  6: "report", //Report
};

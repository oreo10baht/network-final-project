import { User } from "@/models/User";

export function generateMockUsers(count: number): User[] {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push({
      uid: generateUID(),
      username: generateUsername(),
      name: generateName(),
      password: generatePassword(),
      description: generateDescription(),
      pendingList: generateUIDArray(),
      reqList: generateUIDArray(),
      friendList: generateUIDArray(),
      status: generateStatus(),
    });
  }
  return users;
}

function generateUID(): string {
  // Generate unique user ID logic
  return "mockUID";
}

function generateUsername(): string {
  // Generate username logic
  return "mockUsername";
}

function generateName(): string {
  // Generate name logic
  return "mockName";
}

function generatePassword(): string {
  // Generate password logic
  return "mockPassword";
}

function generateDescription(): string {
  // Generate description logic
  return "mockDescription";
}

function generateUIDArray(): string[] {
  // Generate array of UID logic
  return [];
}

function generateStatus(): string {
  // Generate status logic
  return "mockStatus";
}

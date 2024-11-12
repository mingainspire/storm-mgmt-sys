import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export interface Timestamped {
  createdAt: number;
  updatedAt: number;
  version: string;
}

export interface Shareable {
  id: string;
  collaboratorIds?: string[];
  sharingPermissions?: 'private' | 'team' | 'public';
}

export interface EncryptionMetadata {
  isEncrypted: boolean;
  encryptionMethod?: 'AES' | 'RSA';
}

export interface Pattern extends Timestamped, Shareable, EncryptionMetadata {
  id: string;
  description: string;
  type: 'preference' | 'behavior' | 'skill' | 'other';
  confidence: number;
  relatedPatterns?: string[];
}

export interface KnowledgeBase extends Timestamped, Shareable, EncryptionMetadata {
  id: string;
  name: string;
  description?: string;
  dependencies?: string[];
  tags?: string[];
}

export interface Directive extends Timestamped, Shareable, EncryptionMetadata {
  id: string;
  name: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface LearningObjective extends Timestamped, Shareable, EncryptionMetadata {
  id: string;
  name: string;
  description?: string;
  progress: number;
  dependencies?: string[];
}

export interface MemoryState {
  patterns: Pattern[];
  knowledgeBases: KnowledgeBase[];
  directives: Directive[];
  learningObjectives: LearningObjective[];
}

export class MemorySerializer {
  static encrypt(data: any, secretKey: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  }

  static decrypt(encryptedData: string, secretKey: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  static createVersionedEntry<T extends Timestamped>(entry: Omit<T, 'createdAt' | 'updatedAt' | 'version'>): T {
    const now = Date.now();
    return {
      ...entry,
      id: entry.id || uuidv4(),
      createdAt: now,
      updatedAt: now,
      version: '1.0.0'
    } as T;
  }

  static updateVersion<T extends Timestamped>(entry: T): T {
    const [major, minor, patch] = entry.version.split('.').map(Number);
    return {
      ...entry,
      updatedAt: Date.now(),
      version: `${major}.${minor}.${patch + 1}`
    };
  }
}

export function sanitizeForSharing<T extends Shareable>(
  item: T, 
  currentUserId: string, 
  sharingLevel: 'private' | 'team' | 'public' = 'team'
): T {
  return {
    ...item,
    collaboratorIds: sharingLevel === 'private' 
      ? [currentUserId] 
      : sharingLevel === 'team' 
        ? item.collaboratorIds || [currentUserId] 
        : [],
    sharingPermissions: sharingLevel
  };
}

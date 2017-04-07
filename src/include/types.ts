export type uint32 = number;
export type uint16 = number;
export type uint8 = number;
export type char = number;
export type charArray = string;

export interface IReference {
    offset: uint32;
    size: uint32;
}
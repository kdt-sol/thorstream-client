// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: arpc.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientDuplexStream,
  type ClientOptions,
  type handleBidiStreamingCall,
  makeGenericClientConstructor,
  Metadata,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { Timestamp } from "./google/protobuf/timestamp";

export interface SubscribeRequest {
  transactions: { [key: string]: SubscribeRequestFilterTransactions };
  pingId?: number | undefined;
}

export interface SubscribeRequest_TransactionsEntry {
  key: string;
  value: SubscribeRequestFilterTransactions | undefined;
}

export interface SubscribeRequestFilterTransactions {
  accountInclude: string[];
  accountExclude: string[];
  accountRequired: string[];
}

export interface SubscribeResponse {
  createdAt: Date | undefined;
  filters: string[];
  transaction?: SubscribeResponseTransaction | undefined;
}

export interface SubscribeResponseTransaction {
  slot: bigint;
  numRequiredSignatures: number;
  numReadonlySignedAccounts: number;
  numReadonlyUnsignedAccounts: number;
  recentBlockhash: Buffer;
  signatures: Buffer[];
  accountKeys: Buffer[];
  instructions: CompiledInstruction[];
  addressTableLookups: MessageAddressTableLookup[];
}

export interface MessageAddressTableLookup {
  accountKey: Buffer;
  writableIndexes: Buffer;
  readonlyIndexes: Buffer;
}

export interface CompiledInstruction {
  programIdIndex: number;
  accounts: Buffer;
  data: Buffer;
}

function createBaseSubscribeRequest(): SubscribeRequest {
  return { transactions: {}, pingId: undefined };
}

export const SubscribeRequest: MessageFns<SubscribeRequest> = {
  encode(message: SubscribeRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    Object.entries(message.transactions).forEach(([key, value]) => {
      SubscribeRequest_TransactionsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).join();
    });
    if (message.pingId !== undefined) {
      writer.uint32(16).int32(message.pingId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SubscribeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          const entry1 = SubscribeRequest_TransactionsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.transactions[entry1.key] = entry1.value;
          }
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.pingId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<SubscribeRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<SubscribeRequest | SubscribeRequest[]> | Iterable<SubscribeRequest | SubscribeRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeRequest.encode(p).finish()];
        }
      } else {
        yield* [SubscribeRequest.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, SubscribeRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<SubscribeRequest> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeRequest.decode(p)];
        }
      } else {
        yield* [SubscribeRequest.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): SubscribeRequest {
    return {
      transactions: isObject(object.transactions)
        ? Object.entries(object.transactions).reduce<{ [key: string]: SubscribeRequestFilterTransactions }>(
          (acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterTransactions.fromJSON(value);
            return acc;
          },
          {},
        )
        : {},
      pingId: isSet(object.pingId) ? globalThis.Number(object.pingId) : undefined,
    };
  },

  toJSON(message: SubscribeRequest): unknown {
    const obj: any = {};
    if (message.transactions) {
      const entries = Object.entries(message.transactions);
      if (entries.length > 0) {
        obj.transactions = {};
        entries.forEach(([k, v]) => {
          obj.transactions[k] = SubscribeRequestFilterTransactions.toJSON(v);
        });
      }
    }
    if (message.pingId !== undefined) {
      obj.pingId = Math.round(message.pingId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest>, I>>(base?: I): SubscribeRequest {
    return SubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest>, I>>(object: I): SubscribeRequest {
    const message = createBaseSubscribeRequest();
    message.transactions = Object.entries(object.transactions ?? {}).reduce<
      { [key: string]: SubscribeRequestFilterTransactions }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterTransactions.fromPartial(value);
      }
      return acc;
    }, {});
    message.pingId = object.pingId ?? undefined;
    return message;
  },
};

function createBaseSubscribeRequest_TransactionsEntry(): SubscribeRequest_TransactionsEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_TransactionsEntry: MessageFns<SubscribeRequest_TransactionsEntry> = {
  encode(message: SubscribeRequest_TransactionsEntry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterTransactions.encode(message.value, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SubscribeRequest_TransactionsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_TransactionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterTransactions.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<SubscribeRequest_TransactionsEntry, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<SubscribeRequest_TransactionsEntry | SubscribeRequest_TransactionsEntry[]>
      | Iterable<SubscribeRequest_TransactionsEntry | SubscribeRequest_TransactionsEntry[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeRequest_TransactionsEntry.encode(p).finish()];
        }
      } else {
        yield* [SubscribeRequest_TransactionsEntry.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, SubscribeRequest_TransactionsEntry>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<SubscribeRequest_TransactionsEntry> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeRequest_TransactionsEntry.decode(p)];
        }
      } else {
        yield* [SubscribeRequest_TransactionsEntry.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): SubscribeRequest_TransactionsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? SubscribeRequestFilterTransactions.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SubscribeRequest_TransactionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterTransactions.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_TransactionsEntry>, I>>(
    base?: I,
  ): SubscribeRequest_TransactionsEntry {
    return SubscribeRequest_TransactionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest_TransactionsEntry>, I>>(
    object: I,
  ): SubscribeRequest_TransactionsEntry {
    const message = createBaseSubscribeRequest_TransactionsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? SubscribeRequestFilterTransactions.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseSubscribeRequestFilterTransactions(): SubscribeRequestFilterTransactions {
  return { accountInclude: [], accountExclude: [], accountRequired: [] };
}

export const SubscribeRequestFilterTransactions: MessageFns<SubscribeRequestFilterTransactions> = {
  encode(message: SubscribeRequestFilterTransactions, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.accountInclude) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.accountExclude) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.accountRequired) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SubscribeRequestFilterTransactions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterTransactions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.accountInclude.push(reader.string());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.accountExclude.push(reader.string());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.accountRequired.push(reader.string());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<SubscribeRequestFilterTransactions, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<SubscribeRequestFilterTransactions | SubscribeRequestFilterTransactions[]>
      | Iterable<SubscribeRequestFilterTransactions | SubscribeRequestFilterTransactions[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeRequestFilterTransactions.encode(p).finish()];
        }
      } else {
        yield* [SubscribeRequestFilterTransactions.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, SubscribeRequestFilterTransactions>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<SubscribeRequestFilterTransactions> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeRequestFilterTransactions.decode(p)];
        }
      } else {
        yield* [SubscribeRequestFilterTransactions.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): SubscribeRequestFilterTransactions {
    return {
      accountInclude: globalThis.Array.isArray(object?.accountInclude)
        ? object.accountInclude.map((e: any) => globalThis.String(e))
        : [],
      accountExclude: globalThis.Array.isArray(object?.accountExclude)
        ? object.accountExclude.map((e: any) => globalThis.String(e))
        : [],
      accountRequired: globalThis.Array.isArray(object?.accountRequired)
        ? object.accountRequired.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: SubscribeRequestFilterTransactions): unknown {
    const obj: any = {};
    if (message.accountInclude?.length) {
      obj.accountInclude = message.accountInclude;
    }
    if (message.accountExclude?.length) {
      obj.accountExclude = message.accountExclude;
    }
    if (message.accountRequired?.length) {
      obj.accountRequired = message.accountRequired;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterTransactions>, I>>(
    base?: I,
  ): SubscribeRequestFilterTransactions {
    return SubscribeRequestFilterTransactions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequestFilterTransactions>, I>>(
    object: I,
  ): SubscribeRequestFilterTransactions {
    const message = createBaseSubscribeRequestFilterTransactions();
    message.accountInclude = object.accountInclude?.map((e) => e) || [];
    message.accountExclude = object.accountExclude?.map((e) => e) || [];
    message.accountRequired = object.accountRequired?.map((e) => e) || [];
    return message;
  },
};

function createBaseSubscribeResponse(): SubscribeResponse {
  return { createdAt: undefined, filters: [], transaction: undefined };
}

export const SubscribeResponse: MessageFns<SubscribeResponse> = {
  encode(message: SubscribeResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(10).fork()).join();
    }
    for (const v of message.filters) {
      writer.uint32(18).string(v!);
    }
    if (message.transaction !== undefined) {
      SubscribeResponseTransaction.encode(message.transaction, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SubscribeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.filters.push(reader.string());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.transaction = SubscribeResponseTransaction.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<SubscribeResponse, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<SubscribeResponse | SubscribeResponse[]> | Iterable<SubscribeResponse | SubscribeResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeResponse.encode(p).finish()];
        }
      } else {
        yield* [SubscribeResponse.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, SubscribeResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<SubscribeResponse> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeResponse.decode(p)];
        }
      } else {
        yield* [SubscribeResponse.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): SubscribeResponse {
    return {
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      filters: globalThis.Array.isArray(object?.filters) ? object.filters.map((e: any) => globalThis.String(e)) : [],
      transaction: isSet(object.transaction) ? SubscribeResponseTransaction.fromJSON(object.transaction) : undefined,
    };
  },

  toJSON(message: SubscribeResponse): unknown {
    const obj: any = {};
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.filters?.length) {
      obj.filters = message.filters;
    }
    if (message.transaction !== undefined) {
      obj.transaction = SubscribeResponseTransaction.toJSON(message.transaction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeResponse>, I>>(base?: I): SubscribeResponse {
    return SubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeResponse>, I>>(object: I): SubscribeResponse {
    const message = createBaseSubscribeResponse();
    message.createdAt = object.createdAt ?? undefined;
    message.filters = object.filters?.map((e) => e) || [];
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? SubscribeResponseTransaction.fromPartial(object.transaction)
      : undefined;
    return message;
  },
};

function createBaseSubscribeResponseTransaction(): SubscribeResponseTransaction {
  return {
    slot: 0n,
    numRequiredSignatures: 0,
    numReadonlySignedAccounts: 0,
    numReadonlyUnsignedAccounts: 0,
    recentBlockhash: Buffer.alloc(0),
    signatures: [],
    accountKeys: [],
    instructions: [],
    addressTableLookups: [],
  };
}

export const SubscribeResponseTransaction: MessageFns<SubscribeResponseTransaction> = {
  encode(message: SubscribeResponseTransaction, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.slot !== 0n) {
      if (BigInt.asUintN(64, message.slot) !== message.slot) {
        throw new globalThis.Error("value provided for field message.slot of type uint64 too large");
      }
      writer.uint32(8).uint64(message.slot);
    }
    if (message.numRequiredSignatures !== 0) {
      writer.uint32(16).uint32(message.numRequiredSignatures);
    }
    if (message.numReadonlySignedAccounts !== 0) {
      writer.uint32(24).uint32(message.numReadonlySignedAccounts);
    }
    if (message.numReadonlyUnsignedAccounts !== 0) {
      writer.uint32(32).uint32(message.numReadonlyUnsignedAccounts);
    }
    if (message.recentBlockhash.length !== 0) {
      writer.uint32(42).bytes(message.recentBlockhash);
    }
    for (const v of message.signatures) {
      writer.uint32(50).bytes(v!);
    }
    for (const v of message.accountKeys) {
      writer.uint32(58).bytes(v!);
    }
    for (const v of message.instructions) {
      CompiledInstruction.encode(v!, writer.uint32(66).fork()).join();
    }
    for (const v of message.addressTableLookups) {
      MessageAddressTableLookup.encode(v!, writer.uint32(74).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SubscribeResponseTransaction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeResponseTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.slot = reader.uint64() as bigint;
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.numRequiredSignatures = reader.uint32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.numReadonlySignedAccounts = reader.uint32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.numReadonlyUnsignedAccounts = reader.uint32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.recentBlockhash = Buffer.from(reader.bytes());
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.signatures.push(Buffer.from(reader.bytes()));
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.accountKeys.push(Buffer.from(reader.bytes()));
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }

          message.instructions.push(CompiledInstruction.decode(reader, reader.uint32()));
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.addressTableLookups.push(MessageAddressTableLookup.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<SubscribeResponseTransaction, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<SubscribeResponseTransaction | SubscribeResponseTransaction[]>
      | Iterable<SubscribeResponseTransaction | SubscribeResponseTransaction[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeResponseTransaction.encode(p).finish()];
        }
      } else {
        yield* [SubscribeResponseTransaction.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, SubscribeResponseTransaction>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<SubscribeResponseTransaction> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [SubscribeResponseTransaction.decode(p)];
        }
      } else {
        yield* [SubscribeResponseTransaction.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): SubscribeResponseTransaction {
    return {
      slot: isSet(object.slot) ? BigInt(object.slot) : 0n,
      numRequiredSignatures: isSet(object.numRequiredSignatures) ? globalThis.Number(object.numRequiredSignatures) : 0,
      numReadonlySignedAccounts: isSet(object.numReadonlySignedAccounts)
        ? globalThis.Number(object.numReadonlySignedAccounts)
        : 0,
      numReadonlyUnsignedAccounts: isSet(object.numReadonlyUnsignedAccounts)
        ? globalThis.Number(object.numReadonlyUnsignedAccounts)
        : 0,
      recentBlockhash: isSet(object.recentBlockhash)
        ? Buffer.from(bytesFromBase64(object.recentBlockhash))
        : Buffer.alloc(0),
      signatures: globalThis.Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => Buffer.from(bytesFromBase64(e)))
        : [],
      accountKeys: globalThis.Array.isArray(object?.accountKeys)
        ? object.accountKeys.map((e: any) => Buffer.from(bytesFromBase64(e)))
        : [],
      instructions: globalThis.Array.isArray(object?.instructions)
        ? object.instructions.map((e: any) => CompiledInstruction.fromJSON(e))
        : [],
      addressTableLookups: globalThis.Array.isArray(object?.addressTableLookups)
        ? object.addressTableLookups.map((e: any) => MessageAddressTableLookup.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SubscribeResponseTransaction): unknown {
    const obj: any = {};
    if (message.slot !== 0n) {
      obj.slot = message.slot.toString();
    }
    if (message.numRequiredSignatures !== 0) {
      obj.numRequiredSignatures = Math.round(message.numRequiredSignatures);
    }
    if (message.numReadonlySignedAccounts !== 0) {
      obj.numReadonlySignedAccounts = Math.round(message.numReadonlySignedAccounts);
    }
    if (message.numReadonlyUnsignedAccounts !== 0) {
      obj.numReadonlyUnsignedAccounts = Math.round(message.numReadonlyUnsignedAccounts);
    }
    if (message.recentBlockhash.length !== 0) {
      obj.recentBlockhash = base64FromBytes(message.recentBlockhash);
    }
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => base64FromBytes(e));
    }
    if (message.accountKeys?.length) {
      obj.accountKeys = message.accountKeys.map((e) => base64FromBytes(e));
    }
    if (message.instructions?.length) {
      obj.instructions = message.instructions.map((e) => CompiledInstruction.toJSON(e));
    }
    if (message.addressTableLookups?.length) {
      obj.addressTableLookups = message.addressTableLookups.map((e) => MessageAddressTableLookup.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeResponseTransaction>, I>>(base?: I): SubscribeResponseTransaction {
    return SubscribeResponseTransaction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeResponseTransaction>, I>>(object: I): SubscribeResponseTransaction {
    const message = createBaseSubscribeResponseTransaction();
    message.slot = object.slot ?? 0n;
    message.numRequiredSignatures = object.numRequiredSignatures ?? 0;
    message.numReadonlySignedAccounts = object.numReadonlySignedAccounts ?? 0;
    message.numReadonlyUnsignedAccounts = object.numReadonlyUnsignedAccounts ?? 0;
    message.recentBlockhash = object.recentBlockhash ?? Buffer.alloc(0);
    message.signatures = object.signatures?.map((e) => e) || [];
    message.accountKeys = object.accountKeys?.map((e) => e) || [];
    message.instructions = object.instructions?.map((e) => CompiledInstruction.fromPartial(e)) || [];
    message.addressTableLookups = object.addressTableLookups?.map((e) => MessageAddressTableLookup.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseMessageAddressTableLookup(): MessageAddressTableLookup {
  return { accountKey: Buffer.alloc(0), writableIndexes: Buffer.alloc(0), readonlyIndexes: Buffer.alloc(0) };
}

export const MessageAddressTableLookup: MessageFns<MessageAddressTableLookup> = {
  encode(message: MessageAddressTableLookup, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.accountKey.length !== 0) {
      writer.uint32(10).bytes(message.accountKey);
    }
    if (message.writableIndexes.length !== 0) {
      writer.uint32(18).bytes(message.writableIndexes);
    }
    if (message.readonlyIndexes.length !== 0) {
      writer.uint32(26).bytes(message.readonlyIndexes);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MessageAddressTableLookup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageAddressTableLookup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.accountKey = Buffer.from(reader.bytes());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.writableIndexes = Buffer.from(reader.bytes());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.readonlyIndexes = Buffer.from(reader.bytes());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<MessageAddressTableLookup, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<MessageAddressTableLookup | MessageAddressTableLookup[]>
      | Iterable<MessageAddressTableLookup | MessageAddressTableLookup[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [MessageAddressTableLookup.encode(p).finish()];
        }
      } else {
        yield* [MessageAddressTableLookup.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, MessageAddressTableLookup>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<MessageAddressTableLookup> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [MessageAddressTableLookup.decode(p)];
        }
      } else {
        yield* [MessageAddressTableLookup.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): MessageAddressTableLookup {
    return {
      accountKey: isSet(object.accountKey) ? Buffer.from(bytesFromBase64(object.accountKey)) : Buffer.alloc(0),
      writableIndexes: isSet(object.writableIndexes)
        ? Buffer.from(bytesFromBase64(object.writableIndexes))
        : Buffer.alloc(0),
      readonlyIndexes: isSet(object.readonlyIndexes)
        ? Buffer.from(bytesFromBase64(object.readonlyIndexes))
        : Buffer.alloc(0),
    };
  },

  toJSON(message: MessageAddressTableLookup): unknown {
    const obj: any = {};
    if (message.accountKey.length !== 0) {
      obj.accountKey = base64FromBytes(message.accountKey);
    }
    if (message.writableIndexes.length !== 0) {
      obj.writableIndexes = base64FromBytes(message.writableIndexes);
    }
    if (message.readonlyIndexes.length !== 0) {
      obj.readonlyIndexes = base64FromBytes(message.readonlyIndexes);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageAddressTableLookup>, I>>(base?: I): MessageAddressTableLookup {
    return MessageAddressTableLookup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageAddressTableLookup>, I>>(object: I): MessageAddressTableLookup {
    const message = createBaseMessageAddressTableLookup();
    message.accountKey = object.accountKey ?? Buffer.alloc(0);
    message.writableIndexes = object.writableIndexes ?? Buffer.alloc(0);
    message.readonlyIndexes = object.readonlyIndexes ?? Buffer.alloc(0);
    return message;
  },
};

function createBaseCompiledInstruction(): CompiledInstruction {
  return { programIdIndex: 0, accounts: Buffer.alloc(0), data: Buffer.alloc(0) };
}

export const CompiledInstruction: MessageFns<CompiledInstruction> = {
  encode(message: CompiledInstruction, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.programIdIndex !== 0) {
      writer.uint32(8).uint32(message.programIdIndex);
    }
    if (message.accounts.length !== 0) {
      writer.uint32(18).bytes(message.accounts);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CompiledInstruction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompiledInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.programIdIndex = reader.uint32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.accounts = Buffer.from(reader.bytes());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.data = Buffer.from(reader.bytes());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CompiledInstruction, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CompiledInstruction | CompiledInstruction[]>
      | Iterable<CompiledInstruction | CompiledInstruction[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [CompiledInstruction.encode(p).finish()];
        }
      } else {
        yield* [CompiledInstruction.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CompiledInstruction>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CompiledInstruction> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of (pkt as any)) {
          yield* [CompiledInstruction.decode(p)];
        }
      } else {
        yield* [CompiledInstruction.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): CompiledInstruction {
    return {
      programIdIndex: isSet(object.programIdIndex) ? globalThis.Number(object.programIdIndex) : 0,
      accounts: isSet(object.accounts) ? Buffer.from(bytesFromBase64(object.accounts)) : Buffer.alloc(0),
      data: isSet(object.data) ? Buffer.from(bytesFromBase64(object.data)) : Buffer.alloc(0),
    };
  },

  toJSON(message: CompiledInstruction): unknown {
    const obj: any = {};
    if (message.programIdIndex !== 0) {
      obj.programIdIndex = Math.round(message.programIdIndex);
    }
    if (message.accounts.length !== 0) {
      obj.accounts = base64FromBytes(message.accounts);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompiledInstruction>, I>>(base?: I): CompiledInstruction {
    return CompiledInstruction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompiledInstruction>, I>>(object: I): CompiledInstruction {
    const message = createBaseCompiledInstruction();
    message.programIdIndex = object.programIdIndex ?? 0;
    message.accounts = object.accounts ?? Buffer.alloc(0);
    message.data = object.data ?? Buffer.alloc(0);
    return message;
  },
};

export type ARPCServiceService = typeof ARPCServiceService;
export const ARPCServiceService = {
  subscribe: {
    path: "/arpc.ARPCService/Subscribe",
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: SubscribeRequest) => Buffer.from(SubscribeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubscribeRequest.decode(value),
    responseSerialize: (value: SubscribeResponse) => Buffer.from(SubscribeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SubscribeResponse.decode(value),
  },
} as const;

export interface ARPCServiceServer extends UntypedServiceImplementation {
  subscribe: handleBidiStreamingCall<SubscribeRequest, SubscribeResponse>;
}

export interface ARPCServiceClient extends Client {
  subscribe(): ClientDuplexStream<SubscribeRequest, SubscribeResponse>;
  subscribe(options: Partial<CallOptions>): ClientDuplexStream<SubscribeRequest, SubscribeResponse>;
  subscribe(
    metadata: Metadata,
    options?: Partial<CallOptions>,
  ): ClientDuplexStream<SubscribeRequest, SubscribeResponse>;
}

export const ARPCServiceClient = makeGenericClientConstructor(ARPCServiceService, "arpc.ARPCService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ARPCServiceClient;
  service: typeof ARPCServiceService;
  serviceName: string;
};

function bytesFromBase64(b64: string): Uint8Array {
  return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
}

function base64FromBytes(arr: Uint8Array): string {
  return globalThis.Buffer.from(arr).toString("base64");
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | bigint | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = BigInt(Math.trunc(date.getTime() / 1_000));
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (globalThis.Number(t.seconds.toString()) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  encodeTransform(source: AsyncIterable<T | T[]> | Iterable<T | T[]>): AsyncIterable<Uint8Array>;
  decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<T>;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}

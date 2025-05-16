import type { AddQuery, CountQuery, GetQuery, ListQuery, Model, RemoveQuery, SetQuery } from "@ronin/compiler";
import type { StoredObject } from "@ronin/compiler";
import type { DeepCallable, ResultRecord } from "@ronin/syntax/queries";
import type { PromiseTuple, QueryHandlerOptions } from "ronin/types";
type ResolveSchema<TSchema, TUsing extends Array<string> | "all", TKey extends string> = TUsing extends "all" ? TSchema : TKey extends TUsing[number] ? TSchema : TSchema extends Array<unknown> ? Array<string> : string;
declare module "ronin" {
    export type User = ResultRecord & {
        email: string;
        emailVerified: boolean;
        image: StoredObject;
        name: string;
    };
    export type Users = Array<User> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    export type Account<TUsing extends Array<"user"> | "all" = [
    ]> = ResultRecord & {
        accessToken: string;
        accessTokenExpiresAt: Date;
        accountId: string;
        idToken: string;
        password: string;
        providerId: string;
        refreshToken: string;
        refreshTokenExpiresAt: Date;
        scope: string;
        user: ResolveSchema<User, TUsing, "user">;
    };
    export type Accounts<TUsing extends Array<"user"> | "all" = [
    ]> = Array<Account<TUsing>> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    export type Session<TUsing extends Array<"user"> | "all" = [
    ]> = ResultRecord & {
        expiresAt: Date;
        ipAddress: string;
        token: string;
        user: ResolveSchema<User, TUsing, "user">;
        userAgent: string;
    };
    export type Sessions<TUsing extends Array<"user"> | "all" = [
    ]> = Array<Session<TUsing>> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    export type Verification = ResultRecord & {
        expiresAt: Date;
        identifier: string;
        value: string;
    };
    export type Verifications = Array<Verification> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    declare const get: {
        /* Get a single User record */
        user: DeepCallable<GetQuery[keyof GetQuery], User | null>;
        /* Get multiple User records */
        users: DeepCallable<GetQuery[keyof GetQuery], Users>;
        /* Get a single Account record */
        account: DeepCallable<GetQuery[keyof GetQuery], Account | null>;
        /* Get multiple Account records */
        accounts: DeepCallable<GetQuery[keyof GetQuery], Accounts>;
        /* Get a single Session record */
        session: DeepCallable<GetQuery[keyof GetQuery], Session | null>;
        /* Get multiple Session records */
        sessions: DeepCallable<GetQuery[keyof GetQuery], Sessions>;
        /* Get a single Verification record */
        verification: DeepCallable<GetQuery[keyof GetQuery], Verification | null>;
        /* Get multiple Verification records */
        verifications: DeepCallable<GetQuery[keyof GetQuery], Verifications>;
    };
    declare const count: {
        /* Count multiple User records */
        users: DeepCallable<CountQuery[keyof CountQuery], number>;
        /* Count multiple Account records */
        accounts: DeepCallable<CountQuery[keyof CountQuery], number>;
        /* Count multiple Session records */
        sessions: DeepCallable<CountQuery[keyof CountQuery], number>;
        /* Count multiple Verification records */
        verifications: DeepCallable<CountQuery[keyof CountQuery], number>;
    };
    declare const set: {
        /* Set a single User record */
        user: DeepCallable<SetQuery[keyof SetQuery], User | null>;
        /* Set multiple User records */
        users: DeepCallable<SetQuery[keyof SetQuery], Users>;
        /* Set a single Account record */
        account: DeepCallable<SetQuery[keyof SetQuery], Account | null>;
        /* Set multiple Account records */
        accounts: DeepCallable<SetQuery[keyof SetQuery], Accounts>;
        /* Set a single Session record */
        session: DeepCallable<SetQuery[keyof SetQuery], Session | null>;
        /* Set multiple Session records */
        sessions: DeepCallable<SetQuery[keyof SetQuery], Sessions>;
        /* Set a single Verification record */
        verification: DeepCallable<SetQuery[keyof SetQuery], Verification | null>;
        /* Set multiple Verification records */
        verifications: DeepCallable<SetQuery[keyof SetQuery], Verifications>;
    };
    declare const add: {
        /* Add a single User record */
        user: DeepCallable<AddQuery[keyof AddQuery], User | null>;
        /* Add a single Account record */
        account: DeepCallable<AddQuery[keyof AddQuery], Account | null>;
        /* Add a single Session record */
        session: DeepCallable<AddQuery[keyof AddQuery], Session | null>;
        /* Add a single Verification record */
        verification: DeepCallable<AddQuery[keyof AddQuery], Verification | null>;
    };
    declare const remove: {
        /* Remove a single User record */
        user: DeepCallable<RemoveQuery[keyof RemoveQuery], User | null>;
        /* Remove multiple User records */
        users: DeepCallable<RemoveQuery[keyof RemoveQuery], Users>;
        /* Remove a single Account record */
        account: DeepCallable<RemoveQuery[keyof RemoveQuery], Account | null>;
        /* Remove multiple Account records */
        accounts: DeepCallable<RemoveQuery[keyof RemoveQuery], Accounts>;
        /* Remove a single Session record */
        session: DeepCallable<RemoveQuery[keyof RemoveQuery], Session | null>;
        /* Remove multiple Session records */
        sessions: DeepCallable<RemoveQuery[keyof RemoveQuery], Sessions>;
        /* Remove a single Verification record */
        verification: DeepCallable<RemoveQuery[keyof RemoveQuery], Verification | null>;
        /* Remove multiple Verification records */
        verifications: DeepCallable<RemoveQuery[keyof RemoveQuery], Verifications>;
    };
    declare const batch: <TQueries extends [
        Promise,
        ...Array<Promise>
    ] | Array<Promise>>(operations: () => TQueries, queryOptions?: Record<string, unknown>) => Promise<PromiseTuple<TQueries>>;
    declare const list: {
        /* List all model definitions */
        models: DeepCallable<ListQuery[keyof ListQuery], Array<Model>>;
    };
    declare const createSyntaxFactory: (options: QueryHandlerOptions | (() => QueryHandlerOptions)) => {
        get: typeof get;
        count: typeof count;
        set: typeof set;
        add: typeof add;
        remove: typeof remove;
        list: typeof list;
        create: typeof import("ronin").create;
        alter: typeof import("ronin").alter;
        drop: typeof import("ronin").drop;
        batch: typeof import("ronin").batch;
        sql: typeof import("ronin").sql;
        sqlBatch: typeof import("ronin").sqlBatch;
    };
    export default function (options: QueryHandlerOptions | (() => QueryHandlerOptions)): {
        get: typeof get;
        count: typeof count;
        set: typeof set;
        add: typeof add;
        remove: typeof remove;
        list: typeof list;
        create: typeof import("ronin").create;
        alter: typeof import("ronin").alter;
        drop: typeof import("ronin").drop;
        batch: typeof import("ronin").batch;
        sql: typeof import("ronin").sql;
        sqlBatch: typeof import("ronin").sqlBatch;
    };
}

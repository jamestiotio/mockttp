import gql from "graphql-tag";

export const MockttpSchema = gql`
    extend type Query {
        mockedEndpoints: [MockedEndpoint!]!
        pendingEndpoints: [MockedEndpoint!]!
        mockedEndpoint(id: ID!): MockedEndpoint
    }

    extend type Mutation {
        addRule(input: MockRule!): MockedEndpoint!
        addRules(input: [MockRule!]!): [MockedEndpoint!]!
        setRules(input: [MockRule!]!): [MockedEndpoint!]!
        setFallbackRule(input: MockRule!): MockedEndpoint!

        addWebSocketRule(input: WebSocketMockRule!): MockedEndpoint!
        addWebSocketRules(input: [WebSocketMockRule!]!): [MockedEndpoint!]!
        setWebSocketRules(input: [WebSocketMockRule!]!): [MockedEndpoint!]!
    }

    extend type Subscription {
        requestInitiated: InitiatedRequest!
        requestReceived: Request!
        responseCompleted: Response!
        webSocketRequest: Request!
        webSocketAccepted: Response!
        webSocketMessageReceived: WebSocketMessage!
        webSocketMessageSent: WebSocketMessage!
        webSocketClose: WebSocketClose!
        requestAborted: Request!
        failedTlsRequest: TlsRequest!
        failedClientRequest: ClientError!
    }

    type MockedEndpoint {
        id: ID!
        explanation: String
        seenRequests: [Request!]!
        isPending: Boolean!
    }

    input MockRule {
        id: String
        priority: Int
        matchers: [Raw!]!
        handler: Raw!
        completionChecker: Raw
    }

    input WebSocketMockRule {
        id: String
        priority: Int
        matchers: [Raw!]!
        handler: Raw!
        completionChecker: Raw
    }

    type TlsRequest {
        failureCause: String!
        hostname: String
        remoteIpAddress: String!
        remotePort: Int!
        tags: [String!]!
        timingEvents: Json!
    }

    type ClientError {
        errorCode: String
        request: ClientErrorRequest!
        response: Response
    }

    type ClientErrorRequest {
        id: ID!
        timingEvents: Json!
        tags: [String!]!

        protocol: String
        httpVersion: String
        method: String
        url: String
        path: String
        headers: Json
        rawHeaders: Json
        remoteIpAddress: String!
        remotePort: Int!
    }

    type InitiatedRequest {
        id: ID!
        timingEvents: Json!
        tags: [String!]!
        matchedRuleId: ID

        protocol: String!
        httpVersion: String!
        method: String!
        url: String!
        path: String!
        remoteIpAddress: String!
        remotePort: Int!
        hostname: String

        headers: Json!
        rawHeaders: Json!
    }

    type Request {
        id: ID!
        timingEvents: Json!
        tags: [String!]!
        matchedRuleId: ID

        protocol: String!
        httpVersion: String!
        method: String!
        url: String!
        path: String!
        remoteIpAddress: String!
        remotePort: Int!
        hostname: String

        headers: Json!
        rawHeaders: Json!

        body: Buffer!
    }

    type Response {
        id: ID!
        timingEvents: Json!
        tags: [String!]!

        statusCode: Int!
        statusMessage: String!

        headers: Json!
        rawHeaders: Json!
        body: Buffer!
    }

    type WebSocketMessage {
        streamId: ID!
        direction: String!
        content: Buffer!
        isBinary: Boolean!
        eventTimestamp: Float!

        timingEvents: Json!
        tags: [String!]!
    }

    type WebSocketClose {
        streamId: ID!

        closeCode: Int
        closeReason: String

        timingEvents: Json!
        tags: [String!]!
    }
`;
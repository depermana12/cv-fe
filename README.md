# Developer Documentation: CV Builder & Job Tracker

## 1. Project Overview

This project is a comprehensive tool for career management, built with a modern frontend stack. It allows users to create and manage multiple ATS-friendly CVs, track job applications, and generate cover letters. The application is designed with a domain-driven structure to ensure scalability and maintainability.

**Core Technologies:**

- **React:** For building the user interface.
- **TanStack Router:** For declarative, type-safe routing.
- **TanStack Query:** For data fetching, caching, and state management.
- **TanStack Form:** For type-safe and performant forms.
- **Zustand:** For lightweight global state management (e.g., authentication).
- **Mantine:** For a rich set of UI components.
- **Axios:** For making HTTP requests to the backend API.

## 2. Directory Structure

The project follows a domain-driven design approach, where code is organized by feature domains rather than by technical function. This makes it easier to locate and manage all the code related to a specific part of the application.

```
src/
├── app/                  # Core application setup (routing, stores)
│   ├── routes/           # TanStack Router route definitions
│   └── store/            # Zustand global state stores (e.g., authStore.ts)
│
├── assets/               # Static assets like images and icons
│
├── features/             # Domain-specific features
│   ├── auth/             # Authentication (signup, signin, email verification)
│   │   ├── components/   # React components for auth forms
│   │   ├── guards/       # Route guards for protected routes
│   │   ├── hooks/        # Custom hooks for auth logic (e.g., useSignUp)
│   │   ├── services/     # API service calls for auth endpoints
│   │   └── types/        # TypeScript types for authentication
│   │
│   ├── cv/               # CV creation and management
│   │   ├── components/   # Components for CV sections (work, education, etc.)
│   │   ├── hooks/        # Hooks for managing CV data
│   │   ├── schema/       # Zod schemas for CV form validation
│   │   └── services/     # API service for CV endpoints
│   │
│   ├── tracker/          # Job application tracking
│   │   ├── components/   # Components for the tracker board/table
│   │   ├── hooks/        # Hooks for managing application data
│   │   └── services/     # API service for tracker endpoints
│   │
│   └── cover-letter/     # Cover letter generation
│       ├── components/   # Components for the cover letter editor
│       ├── hooks/        # Hooks for generating and saving cover letters
│       └── services/     # API service for cover letter endpoints
│
├── layouts/              # Reusable page layouts (e.g., DashboardLayout)
│
├── shared/               # Code shared across multiple features
│   ├── api/              # Generic API client configurations
│   ├── components/       # Common, reusable UI components (buttons, inputs)
│   ├── hooks/            # General-purpose custom hooks
│   ├── lib/              # Shared libraries (axios instances, query client)
│   └── utils/            # Utility functions
│
├── styles/               # Global styles and theme configuration
│
└── main.tsx              # Application entry point
```

## 3. Main Features

### 3.1. CV Builder

- **Dynamic Form:** Users can create detailed CVs, adding sections for work experience, education, skills, projects, and more.
- **Multiple CVs:** Users can create and manage multiple versions of their CV, tailored for different job applications.
- **ATS-Friendly Templates:** The output is designed to be easily parsed by Applicant Tracking Systems.

### 3.2. Job Tracker

- **Application Logging:** Users can log every job application, including the company, role, date applied, and current status.
- **Status Tracking:** Applications can be moved through different stages (e.g., Applied, Interviewing, Offer, Rejected).
- **Analytics:** Visualizations show application trends and status distributions over time.

### 3.3. Cover Letter Generator

- **Template-Based:** Users can select a template and quickly generate a cover letter.
- **Dynamic Content:** The generator can pull information from the user's profile and the tracked job application to pre-fill the letter.

## 4. Authentication Flow

The authentication flow is designed to be secure and user-friendly, ensuring that users verify their email before gaining access to the main application.

**Steps:**

1.  **Sign Up:** A new user registers with their email and password. The backend creates the user account but marks it as unverified.
2.  **Email Verification:** The user is redirected to a page instructing them to check their email. An email with a unique verification link is sent.
3.  **Verification Confirmation:** The user clicks the link in the email, which hits a backend endpoint to mark the user's email as verified.
4.  **Sign In:** The user can now sign in with their credentials. The backend returns JWT (access and refresh) tokens.
5.  **Authenticated Access:** The application stores the tokens and uses them to make authenticated requests to protected resources.
6.  **Sign Out:** Tokens are cleared from the client, and the user's session is terminated.

## 5. System Architecture & Data Flow

### High-Level Architecture

```mermaid
graph TD;
    subgraph Frontend
        A[React App] -->|API Calls| B[Backend API]
        A -->|State Management| C[Zustand Store]
        A -->|Data Fetching| D[TanStack Query]
    end
    subgraph Backend
        B -->|Database Queries| E[Database]
        B -->|Authentication| F[Auth Service]
    end
    subgraph Database
        E -->|User Data| G[Users Table]
        E -->|CV Data| H[CVs Table]
        E -->|Job Tracker Data| I[Applications Table]
    end
    F -->|JWT Tokens| J[Token Store]
    J -->|Session Management| K[User Session]
```

### Authentication Data Flow

This diagram shows the sequence of events during the sign-up and sign-in process.

```mermaid
sequenceDiagram
    participant Client as React App
    participant Server as Backend API
    participant DB as Database

    Client->>Server: POST /api/v1/auth/signup (email, password)
    Server->>DB: Create user (isEmailVerified: false)
    Server->>Client: 201 Created (redirect to /verify-email)
    Note over Client: User is on email verification page

    Client->>Server: User clicks verification link in email
    Server->>DB: Update user (isEmailVerified: true)
    Note over Client: User can now sign in

    Client->>Server: POST /api/v1/auth/signin (email, password)
    Server->>DB: Find verified user
    alt User Found & Verified
        Server->>Client: 200 OK (accessToken, refreshToken)
        Note over Client: Store tokens, user is authenticated
    else User Not Found or Not Verified
        Server->>Client: 401 Unauthorized
    end
```

### CV Data Management Flow

This diagram illustrates how CV data is fetched and updated within the application using TanStack Query.

```mermaid
sequenceDiagram
    participant User
    participant Component as React Component
    participant TQuery as TanStack Query
    participant API as Backend API

    User->>Component: Navigates to CV editor page
    Component->>TQuery: useQuery(['cv', cvId], fetchCv)
    TQuery->>API: GET /api/v1/cvs/{cvId}
    API-->>TQuery: CV Data
    TQuery-->>Component: Returns { data, isLoading, isError }
    Component->>User: Displays CV form with data

    User->>Component: Modifies a field (e.g., job title)
    Component->>TQuery: useMutation(updateWorkExperience)
    TQuery->>API: PATCH /api/v1/cvs/{cvId}/works/{workId}
    API-->>TQuery: Success response
    TQuery->>TQuery: Invalidates ['cv', cvId] query
    Note right of TQuery: This triggers a re-fetch of the CV data
    TQuery->>API: GET /api/v1/cvs/{cvId}
    API-->>TQuery: Fresh CV Data
    TQuery-->>Component: Updates component with new data
    Component->>User: UI reflects the saved change
```

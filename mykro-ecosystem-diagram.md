# Mykro Ecosystem Process Diagram

## User Flow & System Architecture

```mermaid
flowchart TB
    subgraph "USERS"
        Bettor[👤 Bettor/User]
        Admin[👔 Operator Admin]
        Donor[💝 Donor]
    end

    subgraph "FRONTEND APPLICATIONS"
        subgraph "Betting Platform"
            Browse[Browse Matches]
            BetSlip[Bet Slip]
            MykroToggle[Mykro Donation Toggle]
            PlaceBet[Place Bet + Donation]
        end
        
        subgraph "Operator Dashboard"
            Analytics[Analytics Dashboard]
            CharityMgmt[Charity Management]
            ThemeConfig[Theme Configuration]
            Reports[Financial Reports]
        end
        
        subgraph "Donor Portal"
            Impact[Impact Dashboard]
            Portfolio[Charity Portfolio]
            History[Giving History]
            Stories[Impact Stories]
        end
    end

    subgraph "CORE PROCESSES"
        DonationCalc[Donation Calculator<br/>1-10% of stake]
        ThemeExtractor[Theme Extractor<br/>Analyze competitor sites]
        BetProcessor[Bet Processor]
        DonationTracker[Donation Tracker]
    end

    subgraph "DATA MODELS"
        UserDB[(User)]
        BetDB[(Bet)]
        CharityDB[(Charity)]
        OperatorDB[(Operator)]
        MykroAccDB[(MykroAccount)]
    end

    subgraph "EXTERNAL INTEGRATIONS"
        APIFootball[API-Football<br/>Sports Data]
        Supabase[Supabase<br/>Database]
        PaymentGW[Payment Gateway]
    end

    %% User Flows
    Bettor --> Browse
    Browse --> BetSlip
    BetSlip --> MykroToggle
    MykroToggle --> DonationCalc
    DonationCalc --> PlaceBet
    PlaceBet --> BetProcessor
    BetProcessor --> BetDB
    BetProcessor --> DonationTracker
    DonationTracker --> CharityDB

    Admin --> Analytics
    Admin --> CharityMgmt
    Admin --> ThemeConfig
    ThemeConfig --> ThemeExtractor
    CharityMgmt --> CharityDB
    Analytics --> Reports

    Donor --> Impact
    Donor --> Portfolio
    Donor --> History
    Impact --> MykroAccDB
    Portfolio --> CharityDB

    %% Data Flow
    UserDB -.-> BetDB
    BetDB -.-> MykroAccDB
    OperatorDB -.-> CharityDB
    APIFootball --> Browse
    BetDB --> Supabase
    CharityDB --> Supabase
    PaymentGW --> BetProcessor

    classDef userClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef appClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef processClass fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef dataClass fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef externalClass fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class Bettor,Admin,Donor userClass
    class Browse,BetSlip,MykroToggle,PlaceBet,Analytics,CharityMgmt,ThemeConfig,Reports,Impact,Portfolio,History,Stories appClass
    class DonationCalc,ThemeExtractor,BetProcessor,DonationTracker processClass
    class UserDB,BetDB,CharityDB,OperatorDB,MykroAccDB dataClass
    class APIFootball,Supabase,PaymentGW externalClass
```

## Component Interaction Diagram

```mermaid
graph LR
    subgraph "Betting Interface"
        MatchList[Match List<br/>Component]
        BetSlipComp[Bet Slip<br/>Component]
        MykroComp[Mykro Donation<br/>Component]
    end

    subgraph "State Management"
        BetStore[Bet Store<br/>Zustand]
        ThemeStore[Theme Store<br/>Zustand]
        UserStore[User Store<br/>Zustand]
    end

    subgraph "Services"
        MockData[Mock Data<br/>Service]
        ThemeService[Theme Extraction<br/>Service]
        APIService[API-Football<br/>Service]
    end

    MatchList --> BetStore
    BetSlipComp --> BetStore
    MykroComp --> BetStore
    
    BetStore --> UserStore
    ThemeService --> ThemeStore
    
    MockData --> MatchList
    APIService --> MatchList
    
    classDef component fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    classDef store fill:#ffccbc,stroke:#bf360c,stroke-width:2px
    classDef service fill:#dcedc8,stroke:#33691e,stroke-width:2px
    
    class MatchList,BetSlipComp,MykroComp component
    class BetStore,ThemeStore,UserStore store
    class MockData,ThemeService,APIService service
```

## Data Flow Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant B as Betting UI
    participant M as Mykro Component
    participant S as Bet Store
    participant API as API Service
    participant DB as Database

    U->>B: Browse matches
    B->>API: Fetch sports data
    API-->>B: Return matches
    B-->>U: Display matches
    
    U->>B: Add to bet slip
    B->>S: Update bet state
    
    U->>M: Toggle donation
    M->>S: Set donation %
    
    U->>B: Place bet
    B->>S: Process bet
    S->>DB: Save bet + donation
    DB-->>S: Confirm
    S-->>B: Success
    B-->>U: Show confirmation
```

## Logical Data Model

```mermaid
erDiagram
    USER {
        string id PK
        string email
        string name
        timestamp created_at
    }
    
    OPERATOR {
        string id PK
        string name
        string domain
        json theme_config
        json donation_settings
    }
    
    BET {
        string id PK
        string user_id FK
        string operator_id FK
        decimal stake
        decimal donation_amount
        int donation_percentage
        string charity_id FK
        string status
        timestamp placed_at
    }
    
    CHARITY {
        string id PK
        string name
        string description
        string logo_url
        boolean is_active
    }
    
    MYKRO_ACCOUNT {
        string id PK
        string user_id FK
        decimal total_donated
        int giving_streak
        json charity_allocations
    }
    
    OPERATOR_CHARITY {
        string operator_id FK
        string charity_id FK
        boolean is_default
        int priority
    }

    USER ||--o{ BET : places
    OPERATOR ||--o{ BET : processes
    BET ||--o| CHARITY : donates_to
    USER ||--o| MYKRO_ACCOUNT : has
    OPERATOR ||--o{ OPERATOR_CHARITY : configures
    CHARITY ||--o{ OPERATOR_CHARITY : available_on
```

## Key Business Rules

1. **Donation Calculation**: 
   - Minimum: 1% of stake
   - Maximum: 10% of stake
   - Default: 5% (configurable per operator)

2. **Charity Selection**:
   - Operators curate available charities
   - Users select from operator's list
   - Default charity if none selected

3. **Theme Extraction**:
   - Analyzes competitor URL
   - Extracts primary colors, fonts
   - Applies to white-label interface

4. **Impact Tracking**:
   - Aggregates donations across operators
   - Maintains giving streaks
   - Shows cumulative impact

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State**: Zustand with persistence
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Data**: localStorage (dev) / Supabase (prod)
- **APIs**: API-Football for sports data
import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const FootballIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95c1.82.94 3.37 2.33 4.38 4.02l-.39 1.58-1.35.46L13 9.3V5.3zm-6.35-.95L8 5.3v4l-3.99 1.11-.39-1.58c1.01-1.69 2.56-3.08 4.38-4.02zM7.08 17.11l-1.14.1c-.9-1.32-1.48-2.88-1.62-4.58l.86-.02L7 15.1v2.01zm4.42 2.48V17.4l2.5.62 2.5-.62v2.19c-.8.24-1.64.37-2.5.41-.86-.04-1.7-.17-2.5-.41zm5.42-2.48v-2.01l1.82-2.49.86.02c-.14 1.7-.72 3.26-1.62 4.58l-1.06-.1z"/>
  </svg>
);

export const HorseRacingIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6l-1-1-1 1-1-1-1 1-1-1-1 1-1-1-1 1H9c0-1.1-.9-2-2-2S5 4.9 5 6H2l2 4 1.79-.6c.24.49.59.92 1.02 1.24L5.5 15.5c-.28 1.11.59 2.33 1.7 2.61s2.33-.59 2.61-1.7l1.06-4.23c.65.56 1.51.82 2.38.72L14 16v4c0 1.1.9 2 2 2s2-.9 2-2v-5l2-7c-.5 0-2.5 0-2.5 0l-.5 2-1.5-2H22z"/>
  </svg>
);

export const TennisIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.23.28-2.39.78-3.43l2.64 2.64c-.06.26-.09.52-.09.79 0 2.21 1.79 4 4 4 .27 0 .53-.03.79-.09l2.64 2.64A7.874 7.874 0 0112 20zm5.22-4.57l-2.64-2.64c.06-.26.09-.52.09-.79 0-2.21-1.79-4-4-4-.27 0-.53.03-.79.09L7.22 5.43A7.874 7.874 0 0112 4c4.41 0 8 3.59 8 8 0 1.23-.28 2.39-.78 3.43z"/>
  </svg>
);

export const BasketballIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5.23 7.75C6.1 8.62 6.7 9.74 6.91 11H4.07c.15-1.18.56-2.28 1.16-3.25zM4.07 13h2.84c-.21 1.26-.81 2.38-1.68 3.25-.6-.97-1.01-2.07-1.16-3.25zM11 19.93c-1.73-.22-3.29-1-4.49-2.14 1.3-1.24 2.19-2.91 2.42-4.79H11v6.93zM11 11H8.93C8.69 9.12 7.81 7.44 6.5 6.2 7.71 5.06 9.27 4.29 11 4.07V11zm8.93 0h-2.84c.21-1.26.81-2.38 1.68-3.25.6.97 1.01 2.07 1.16 3.25zM13 4.07c1.73.22 3.29.99 4.5 2.13-1.31 1.24-2.19 2.92-2.43 4.8H13V4.07zM13 13h2.07c.24 1.88 1.12 3.55 2.43 4.79-1.21 1.14-2.77 1.92-4.5 2.14V13zm5.77-1h2.84c-.15 1.18-.56 2.28-1.16 3.25-.87-.87-1.47-1.99-1.68-3.25z"/>
  </svg>
);

export const CricketIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.34 17.77l-6.11-6.11 1.42-1.41 6.11 6.11-1.42 1.41zm4.24-12.01l1.41 1.41c.78.78.78 2.05 0 2.83l-1.18 1.18-4.24-4.24L15.75 5.76c.78-.78 2.05-.78 2.83 0zM5.41 20l5.66-5.66-1.41-1.41L4 18.59 5.41 20zM19 14c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-2-7c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"/>
  </svg>
);

export const RugbyIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 3c1.74 0 3.41.81 4.5 2.09C21.58 6.41 22 7.92 22 9.5c0 1.58-.42 3.09-1 4.41-1.09 1.28-2.76 2.09-4.5 2.09-1.17 0-2.26-.37-3.17-1H10.67c-.91.63-2 1-3.17 1-1.74 0-3.41-.81-4.5-2.09C2.42 12.59 2 11.08 2 9.5c0-1.58.42-3.09 1-4.41C4.09 3.81 5.76 3 7.5 3c1.17 0 2.26.37 3.17 1h2.66c.91-.63 2-1 3.17-1m0 2c-.88 0-1.7.29-2.39.8l3.59 3.59c.51-.69.8-1.51.8-2.39 0-1.04-.47-2-1.23-2.65C17.42 5.12 16.47 5 16.5 5M7.5 5c-.03 0-.05 0-.08.01.77.65 1.23 1.61 1.23 2.64 0 .88-.29 1.7-.8 2.39l3.59-3.59C10.75 5.94 9.92 5.64 9 5.65 8.47 5.12 8 5 7.5 5m7.5 3.5l-6 6 .35.35c.69.51 1.51.8 2.39.8.03 0 .05 0 .08-.01-.77-.65-1.23-1.61-1.23-2.64 0-.88.29-1.7.8-2.39L7.8 14.2c.69.51 1.51.8 2.39.8 1.04 0 2-.47 2.65-1.23.53.77 1.61 1.23 2.65 1.23 1.04 0 2-.47 2.65-1.23-.65-.53-1.61-1.23-2.65-1.23-.88 0-1.7.29-2.39.8L9.5 8.5z"/>
  </svg>
);

export const GolfIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm7-5l-7-3v10.88c-2.38-.58-4.28-2.35-5.02-4.63-.17.22-.38.42-.63.57C5.51 15.57 5 16.52 5 17.61c0 .84.3 1.61.81 2.22.98 1.16 2.66 2.17 4.69 2.17 3.59 0 6.5-2.91 6.5-6.5V14l3 1.3V11z"/>
  </svg>
);

// Quick Links Icons
export const SpecialsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.47 7.6h8L15.4 14.4l2.47 7.6L12 17.2 6.13 22l2.47-7.6L1.53 9.6h8L12 2z"/>
  </svg>
);

export const LiveIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" fill={color}/>
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
);

// All Sports Icons
export const AmericanFootballIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.31 3.69c-.32-.33-1.94-.69-4.3-.69-3.81 0-7.67.91-10.9 3.01C.65 8.85.26 13.91.68 16.86c.19 1.31.49 2.41.89 3.28.39.85 1.33 1.62 2.15 1.86 1.42.41 4.41.04 7.36-1.32 2.86-1.32 5.61-3.61 7.38-6.72 1.03-1.81 1.48-3.56 1.48-5.01 0-.87-.16-1.56-.49-2.06-.12-.18-.27-.35-.44-.52l-.7-.68zM8.12 4.99c1.82-.82 3.77-1.37 5.73-1.61l-2.93 2.93c-.5-.05-1.01-.08-1.53-.08-.44 0-.87.02-1.27.05zm10.96 1.2l-3.34 3.34c.03.37.04.74.04 1.11 0 1.84-.33 3.58-.94 5.15l2.95-2.95c.7-2.05.97-4.02.97-5.45 0-.42-.03-.82-.08-1.2h.4zm-2.76 6.21c-.51.87-1.13 1.65-1.82 2.34-.25.25-.51.48-.77.72l2.87-2.87c-.08-.07-.18-.13-.28-.19z"/>
  </svg>
);

export const BaseballIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9 10 12.5 6.5 9zm11 6L14 18.5 10.5 15 14 11.5 17.5 15zm-1.41-6.59l-2.12 2.13-1.41-1.41 2.12-2.13a3.96 3.96 0 00-5.66 0l-2.12 2.12-1.41-1.41 2.12-2.12C10.94 3.64 13.06 3.64 15.3 5.88s2.24 5.64 0 7.88l-2.12 2.12-1.41-1.41 2.12-2.12c1.54-1.54 1.54-4.05 0-5.59z"/>
  </svg>
);

export const BoxingIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 16c0 .55-.45 1-1 1h-1l-3.5-6H16V8h-6c-2.21 0-4 1.79-4 4v6c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-5.5l2.5 4.5H17c1.1 0 2-.9 2-2v-3zm-7-13c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h1l3 3 3-3h1c.55 0 1-.45 1-1V7c0-2.21-1.79-4-4-4z"/>
  </svg>
);

export const DartsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export const EsportsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0016.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

export const FormulaOneIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.96 11.22C21.57 7.01 17.76 4 13.5 4c-.19 0-.38.01-.57.02C8.64 4.2 4.87 7.04 3.4 11H2v2h1.06c-.04.33-.06.66-.06 1 0 4.41 3.59 8 8 8s8-3.59 8-8c0-.34-.02-.67-.06-1H22v-2h-1.04zM12 2h3.5c.09 0 .18.01.27.01C19.65 2.13 23 5.53 23 9.61c0 .34-.02.67-.06 1H23v2h-.06c-.46 4.17-3.77 7.48-7.94 7.94V17h2v-2h-2c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-1.66 0-3 1.34-3 3v2c0 1.66 1.34 3 3 3v3.49c-.17.01-.33.01-.5.01C6.54 20.5 1 14.96 1 8.5S6.54-3.5 13-3.5V2z"/>
  </svg>
);

export const IceHockeyIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 17v3h2v-4H3c-.55 0-1 .45-1 1zm7-1H5v4l4.69-.01c.38 0 .72-.21.89-.55l.87-1.9-1.59-3.48L9 16zm10.92.42l.86 1.89c.16.35.51.57.88.57L22 19v-4h-4l-.85 1.88-1.59-3.47-1.64 3.01zm-2.27-4.98L12 2l-5.65 9.44L10.26 20h3.48l3.91-8.56zM10.42 16L9 13.5 12 8l3 5.5L13.58 16h-3.16z"/>
  </svg>
);

export const MMAIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zM5 17c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1zM16.5 3.5L11 2 5.5 3.5 4 9c0 5.25 3.58 9.81 7 11 3.42-1.19 7-5.75 7-11l-1.5-5.5z"/>
  </svg>
);

export const SnookerIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill={color}/>
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">8</text>
  </svg>
);

// Additional icons
export const GreyhoundIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4l-3.43 3.43c.58.55.95 1.33.95 2.2 0 .53-.14 1.02-.38 1.45l1.01 1.01 1.42-1.41L21 7.24 18 4zm-5.29 5.29L7 15v3l1 1h3l5.71-5.71c.63-.63.95-1.47.95-2.29 0-.87-.38-1.65-.95-2.2l-2.21-2.21c-.55-.58-1.33-.95-2.21-.95-.81 0-1.66.37-2.29 1.01L4.59 11H3l-1 1v3l6-6 4.71 4.71z"/>
  </svg>
);

export const LotteriesIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/>
  </svg>
);

export const VirtualsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

export const PromotionsIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
  </svg>
);

export const RacingIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m-11 0A1.5 1.5 0 015 14.5 1.5 1.5 0 016.5 13 1.5 1.5 0 018 14.5 1.5 1.5 0 016.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8l-2.08-6z"/>
  </svg>
);

export const ShopIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/>
  </svg>
);

export const GamesIcon: React.FC<IconProps> = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
  </svg>
);
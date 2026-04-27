// =============== SHARED ICONS AND THEME HELPERS ===============
// This file contains all SVG icons and theme color helpers used across HTML files.
// Include this file before your React/Babel scripts.

// Theme color helper - returns icon color based on theme name
function getThemeIconColor(themeName) {
  const themes = {
    blue: '#2563eb',
    purple: '#9333ea',
    teal: '#0d9488',
    yellow: '#d97706'
  };
  return themes[themeName] || themes.blue;
}

// Theme colors for vanilla JS contexts (returns hue, colors for inline styles)
function getThemeColorsVanilla(themeColor) {
  const themes = {
    blue: { hue: 220, iconColor: '#2563eb', borderColor: 'hsl(220, 70%, 50%)', textColor: 'hsl(220, 70%, 35%)' },
    purple: { hue: 270, iconColor: '#9333ea', borderColor: 'hsl(270, 70%, 50%)', textColor: 'hsl(270, 70%, 35%)' },
    teal: { hue: 175, iconColor: '#0d9488', borderColor: 'hsl(175, 70%, 40%)', textColor: 'hsl(175, 70%, 30%)' },
    yellow: { hue: 45, iconColor: '#d97706', borderColor: 'hsl(45, 80%, 45%)', textColor: 'hsl(45, 80%, 30%)' }
  };
  return themes[themeColor] || themes.blue;
}

// Theme classes helper - returns Tailwind classes based on theme
function getThemeClasses(themeColor) {
  const themes = {
    blue: {
      panelBg: 'bg-blue-50',
      panelBorder: 'border-blue-200',
      statBoxBg: 'bg-blue-50/50',
      buttonBg: 'bg-blue-600',
      buttonHover: 'hover:bg-blue-500',
      buttonRing: 'ring-blue-300',
      pillBg: 'bg-blue-50',
      pillText: 'text-blue-700',
      pillBorder: 'border-blue-200',
      iconColor: 'text-blue-600',
      focusRing: 'focus:ring-blue-400',
      focusBorder: 'focus:border-blue-400',
    },
    purple: {
      panelBg: 'bg-purple-50',
      panelBorder: 'border-purple-200',
      statBoxBg: 'bg-purple-50/50',
      buttonBg: 'bg-purple-600',
      buttonHover: 'hover:bg-purple-500',
      buttonRing: 'ring-purple-300',
      pillBg: 'bg-purple-50',
      pillText: 'text-purple-700',
      pillBorder: 'border-purple-200',
      iconColor: 'text-purple-600',
      focusRing: 'focus:ring-purple-400',
      focusBorder: 'focus:border-purple-400',
    },
    teal: {
      panelBg: 'bg-teal-50',
      panelBorder: 'border-teal-200',
      statBoxBg: 'bg-teal-50/50',
      buttonBg: 'bg-teal-600',
      buttonHover: 'hover:bg-teal-500',
      buttonRing: 'ring-teal-300',
      pillBg: 'bg-teal-50',
      pillText: 'text-teal-700',
      pillBorder: 'border-teal-200',
      iconColor: 'text-teal-600',
      focusRing: 'focus:ring-teal-400',
      focusBorder: 'focus:border-teal-400',
    },
    yellow: {
      panelBg: 'bg-amber-50',
      panelBorder: 'border-amber-300',
      statBoxBg: 'bg-amber-50/50',
      buttonBg: 'bg-amber-600',
      buttonHover: 'hover:bg-amber-500',
      buttonRing: 'ring-amber-400',
      pillBg: 'bg-amber-100',
      pillText: 'text-amber-800',
      pillBorder: 'border-amber-400',
      iconColor: 'text-amber-700',
      focusRing: 'focus:ring-amber-400',
      focusBorder: 'focus:border-amber-400',
    }
  };
  return themes[themeColor] || themes.blue;
}

// =============== REACT SVG ICON COMPONENTS ===============
// These are defined as string templates that can be evaluated in Babel context

const SHARED_ICON_COMPONENTS = `
  // Drink Icon - shows different icons based on drink name
  function DrinkIcon({ className, drinkName, style }) {
    // Zyrax-norm: cup/glass icon
    if (drinkName && drinkName.toLowerCase().includes('zerqalase')) {
      return (
        <svg className={className} style={style} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M443.882,5.28C440.842,1.92,436.554,0,432.01,0h-352c-4.512,0-8.832,1.92-11.872,5.28c-3.008,3.328-4.512,7.808-4.064,12.32l48,480c0.832,8.192,7.712,14.4,15.936,14.4h256c8.224,0,15.104-6.208,15.904-14.4l48-480C448.394,13.088,446.922,8.608,443.882,5.28z M401.29,162.496c-40.672,13.152-93.6,19.232-135.136-14.848c-52.064-42.72-115.872-35.36-159.136-22.496L97.706,32h316.608L401.29,162.496z"/>
        </svg>
      );
    }
    // Nexol-norm: bottle/flask icon
    if (drinkName && drinkName.toLowerCase().includes('melythor')) {
      return (
        <svg className={className} style={style} viewBox="25 0 50 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="m68.3983231 39.4338799v51.373867c0 3.6944504-2.9977417 6.6922531-6.6921844 6.6922531h-23.4122773c-3.6944466 0-6.6921864-2.9978027-6.6921864-6.6922531v-51.373867c0-3.2933311 1.0977535-6.4916306 3.1244678-9.0988846l5.3199768-6.8294144c1.2877464-1.6572304 1.9844475-3.6839428 1.9844475-5.773922v-2.7444191h15.9388657v2.7444191c0 2.0899792.696701 4.1166916 1.9844475 5.773922l5.3199768 6.8294144c2.0267105 2.607254 3.124466 5.8055534 3.124466 9.0988846z"/>
          <path d="m58.727375 11.8242331h-17.45475c-.7878952 0-1.426609-.6387148-1.426609-1.426609v-6.471015c-.0000001-.7878943.6387138-1.4266091 1.426609-1.4266091h17.45475c.7878952 0 1.426609.6387148 1.426609 1.4266093v6.471015c.0000001.787894-.6387138 1.4266088-1.426609 1.4266088z"/>
        </svg>
      );
    }
    // Qivex-norm (default): cup with straw icon
    return (
      <svg className={className} style={style} viewBox="0 0 462.848 462.848" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <polygon points="246.784,94.208 246.784,53.248 344.064,29.184 336.384,0 216.064,29.184 216.064,94.208 82.432,94.208 82.432,160.768 380.416,160.768 380.416,94.208"/>
        <path d="M102.912,186.368l35.328,249.856c2.048,15.36,15.36,26.624,30.208,26.624h124.416c15.36,0,28.16-11.264,30.208-26.624L358.4,186.368H102.912z"/>
      </svg>
    );
  }

  // Skip Icon - circle with diagonal line
  function SkipIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 512.095 512.095" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="m256.047 0c-141.411 0-256.047 114.636-256.047 256.047s114.636 256.047 256.047 256.047 256.047-114.636 256.047-256.047-114.636-256.047-256.047-256.047zm-192.313 256.047c0-106.212 86.102-192.313 192.313-192.313 41.614 0 80.139 13.221 111.61 35.687l-268.236 268.237c-22.466-31.471-35.687-69.996-35.687-111.611zm192.313 192.314c-41.589 0-80.092-13.204-111.552-35.644l268.221-268.221c22.441 31.46 35.644 69.964 35.644 111.552.001 106.211-86.101 192.313-192.313 192.313z"/>
      </svg>
    );
  }

  // Happy Face Icon - smiling face
  function HappyFaceIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="m50 98c-26.467 0-48-21.533-48-48s21.533-48 48-48 48 21.533 48 48-21.533 48-48 48zm0-90c-23.159 0-42 18.841-42 42s18.841 42 42 42 42-18.841 42-42-18.841-42-42-42zm26.684 52.342c.737-1.475.141-3.258-1.327-4.006-1.471-.743-3.271-.158-4.03 1.304-.22.422-5.549 10.36-21.327 10.36-15.74 0-21.081-9.889-21.325-10.356-.743-1.474-2.542-2.071-4.017-1.327-1.482.741-2.083 2.543-1.342 4.025.28.558 7.055 13.658 26.684 13.658s26.404-13.1 26.684-13.658zm-11.684-16.342c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm-30 0c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
      </svg>
    );
  }

  // Sad Face Icon - frowning face
  function SadFaceIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 1960040 1960040" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="m980022 0c270553 0 515558 109746 692917 287105s287105 422365 287105 692917c0 270553-109746 515558-287105 692917s-422365 287105-692917 287105c-270553 0-515558-109746-692917-287105s-287105-422365-287105-692917c0-270553 109746-515558 287105-692917s422365-287105 692917-287105zm593936 386086c-152010-152010-362027-246064-593936-246064s-441926 94054-593936 246064-246064 362027-246064 593936 94054 441926 246064 593936 362027 246064 593936 246064 441926-94054 593936-246064 246064-362027 246064-593936-94054-441926-246064-593936z" fillRule="nonzero"/>
        <path d="m768029 683625c0-77305-62692-139997-139997-139997s-139997 62692-139997 139997 62692 139997 139997 139997 139997-62692 139997-139997z"/>
        <path d="m1472010 683625c0-77305-62692-139997-139997-139997s-139997 62692-139997 139997 62692 139997 139997 139997 139997-62692 139997-139997z"/>
        <path d="m1390150 1451840c20983 32310 64224 41487 96534 20504s41487-64224 20504-96534c-84810-130828-211356-220566-352072-261227-140849-40694-295852-32310-437346 33054-54021 24952-104239 57626-149100 96716l-132-165c-44464 38743-83603 84017-115946 134532-20835 32459-11409 75683 21050 96517 32459 20835 75683 11409 96517-21050 24919-38891 55394-74062 90250-104438l-132-165 132-116c34476-30045 73500-55361 115864-74939 110225-50913 230735-57510 340018-25944 109431 31616 207867 101445 273860 203254z" fillRule="nonzero"/>
      </svg>
    );
  }

  // Neutral Face Icon - neutral expression
  function NeutralFaceIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
        <path d="m42.07179 9.7714a22.99476 22.99476 0 1 1 -4.0696-4.0195" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
        <circle cx="40.094" cy="7.781" r="1" stroke="none"/>
        <ellipse cx="31.6" cy="19.125" rx="2.4" ry="3" stroke="none"/>
        <ellipse cx="16.4" cy="19.125" rx="2.4" ry="3" stroke="none"/>
      </svg>
    );
  }

  // BioClip Icon - small inline icon for lists
  function BioClipIcon({ className }) {
    return (
      <svg viewBox="0 0 120 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <rect x="18" y="20" width="84" height="100" rx="6" fill="#1e293b" />
        <rect x="22" y="24" width="76" height="92" rx="4" fill="#14532d" />
        <circle cx="60" cy="55" r="24" fill="#22c55e" />
        <path d="M48 55 L56 63 L72 47" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="60" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">NORMAL</text>
        <rect x="30" y="126" width="60" height="18" rx="4" fill="#334155" />
        <text x="60" y="139" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">BioClip™</text>
        <path d="M0 50 L10 50 L10 110 L0 110 C-4 110 -6 105 -6 100 L-6 60 C-6 55 -4 50 0 50 Z" fill="#475569" />
      </svg>
    );
  }
`;

// =============== SVG ICON COMPONENTS FOR INSIDE SVG CANVAS ===============
// These are for use within <svg> elements (like in dagElicitation)

const SHARED_SVG_ICON_COMPONENTS = `
  // Drink Icon for SVG canvas
  function DrinkIconSVG({ x, y, size, drinkName, themeColor }) {
    const color = getThemeIconColor(themeColor || (typeof CONFIG !== 'undefined' ? CONFIG.themeColor : 'blue'));
    const scale = size / 50;

    // Zyrax-norm: cup/glass icon
    if (drinkName && drinkName.toLowerCase().includes('zerqalase')) {
      return (
        <g transform={\`translate(\${x - size/2}, \${y - size/2}) scale(\${scale * 0.1})\`}>
          <path d="M443.882,5.28C440.842,1.92,436.554,0,432.01,0h-352c-4.512,0-8.832,1.92-11.872,5.28c-3.008,3.328-4.512,7.808-4.064,12.32l48,480c0.832,8.192,7.712,14.4,15.936,14.4h256c8.224,0,15.104-6.208,15.904-14.4l48-480C448.394,13.088,446.922,8.608,443.882,5.28z M401.29,162.496c-40.672,13.152-93.6,19.232-135.136-14.848c-52.064-42.72-115.872-35.36-159.136-22.496L97.706,32h316.608L401.29,162.496z" fill={color} />
        </g>
      );
    }
    // Nexol-norm: bottle/flask icon
    if (drinkName && drinkName.toLowerCase().includes('melythor')) {
      return (
        <g transform={\`translate(\${x}, \${y}) scale(\${scale * 0.45})\`}>
          <path d="m68.3983231 39.4338799v51.373867c0 3.6944504-2.9977417 6.6922531-6.6921844 6.6922531h-23.4122773c-3.6944466 0-6.6921864-2.9978027-6.6921864-6.6922531v-51.373867c0-3.2933311 1.0977535-6.4916306 3.1244678-9.0988846l5.3199768-6.8294144c1.2877464-1.6572304 1.9844475-3.6839428 1.9844475-5.773922v-2.7444191h15.9388657v2.7444191c0 2.0899792.696701 4.1166916 1.9844475 5.773922l5.3199768 6.8294144c2.0267105 2.607254 3.124466 5.8055534 3.124466 9.0988846z" fill={color} transform="translate(-50, -50)" />
          <path d="m58.727375 11.8242331h-17.45475c-.7878952 0-1.426609-.6387148-1.426609-1.426609v-6.471015c-.0000001-.7878943.6387138-1.4266091 1.426609-1.4266091h17.45475c.7878952 0 1.426609.6387148 1.426609 1.4266093v6.471015c.0000001.787894-.6387138 1.4266088-1.426609 1.4266088z" fill={color} transform="translate(-50, -50)" />
        </g>
      );
    }
    // Qivex-norm (default): cup with straw icon
    return (
      <g transform={\`translate(\${x - size/2}, \${y - size/2}) scale(\${scale * 0.1})\`}>
        <polygon points="246.784,94.208 246.784,53.248 344.064,29.184 336.384,0 216.064,29.184 216.064,94.208 82.432,94.208 82.432,160.768 380.416,160.768 380.416,94.208" fill={color} />
        <path d="M102.912,186.368l35.328,249.856c2.048,15.36,15.36,26.624,30.208,26.624h124.416c15.36,0,28.16-11.264,30.208-26.624L358.4,186.368H102.912z" fill={color} />
      </g>
    );
  }

  // BioClip Icon for SVG canvas
  function BioClipIconSVG({ x, y, size }) {
    const scale = size / 40;
    return (
      <g transform={\`translate(\${x - size/2}, \${y - size/2}) scale(\${scale})\`}>
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <rect x="5" y="5" width="30" height="26" rx="2" fill="#14532d" />
        <circle cx="20" cy="15" r="8" fill="#22c55e" />
        <path d="M15 15 L18 18 L25 11" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="20" y="27" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">NORMAL</text>
        <rect x="10" y="33" width="20" height="4" rx="1" fill="#334155" />
      </g>
    );
  }

  // Neutral Face Icon for SVG canvas
  function NeutralFaceIconSVG({ x, y, size }) {
    const scale = size / 48;
    return (
      <g transform={\`translate(\${x - size/2}, \${y - size/2}) scale(\${scale})\`}>
        <circle cx="24" cy="24" r="22" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />
        <ellipse cx="16" cy="20" rx="2.5" ry="3" fill="#374151" />
        <ellipse cx="32" cy="20" rx="2.5" ry="3" fill="#374151" />
        <line x1="14" y1="32" x2="34" y2="32" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  }
`;

// =============== VANILLA JS SVG FUNCTIONS ===============
// These return SVG HTML strings for use in vanilla JS contexts

function getDrinkIconSVG(drinkName, size, color) {
  size = size || '2.5rem';
  const fillColor = color || getThemeIconColor(typeof CONFIG !== 'undefined' ? CONFIG.themeColor : 'blue');

  // Zyrax-norm: cup/glass icon
  if (drinkName && drinkName.toLowerCase().includes('zerqalase')) {
    return `<svg style="width: ${size}; height: ${size};" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="${fillColor}">
      <path d="M443.882,5.28C440.842,1.92,436.554,0,432.01,0h-352c-4.512,0-8.832,1.92-11.872,5.28c-3.008,3.328-4.512,7.808-4.064,12.32l48,480c0.832,8.192,7.712,14.4,15.936,14.4h256c8.224,0,15.104-6.208,15.904-14.4l48-480C448.394,13.088,446.922,8.608,443.882,5.28z M401.29,162.496c-40.672,13.152-93.6,19.232-135.136-14.848c-52.064-42.72-115.872-35.36-159.136-22.496L97.706,32h316.608L401.29,162.496z"/>
    </svg>`;
  }
  // Nexol-norm: bottle/flask icon
  if (drinkName && drinkName.toLowerCase().includes('melythor')) {
    return `<svg style="width: ${size}; height: ${size};" viewBox="25 0 50 100" xmlns="http://www.w3.org/2000/svg" fill="${fillColor}">
      <path d="m68.3983231 39.4338799v51.373867c0 3.6944504-2.9977417 6.6922531-6.6921844 6.6922531h-23.4122773c-3.6944466 0-6.6921864-2.9978027-6.6921864-6.6922531v-51.373867c0-3.2933311 1.0977535-6.4916306 3.1244678-9.0988846l5.3199768-6.8294144c1.2877464-1.6572304 1.9844475-3.6839428 1.9844475-5.773922v-2.7444191h15.9388657v2.7444191c0 2.0899792.696701 4.1166916 1.9844475 5.773922l5.3199768 6.8294144c2.0267105 2.607254 3.124466 5.8055534 3.124466 9.0988846z"/>
      <path d="m58.727375 11.8242331h-17.45475c-.7878952 0-1.426609-.6387148-1.426609-1.426609v-6.471015c-.0000001-.7878943.6387138-1.4266091 1.426609-1.4266091h17.45475c.7878952 0 1.426609.6387148 1.426609 1.4266093v6.471015c.0000001.787894-.6387138 1.4266088-1.426609 1.4266088z"/>
    </svg>`;
  }
  // Qivex-norm (default): cup with straw icon
  return `<svg style="width: ${size}; height: ${size};" viewBox="0 0 462.848 462.848" xmlns="http://www.w3.org/2000/svg" fill="${fillColor}">
    <polygon points="246.784,94.208 246.784,53.248 344.064,29.184 336.384,0 216.064,29.184 216.064,94.208 82.432,94.208 82.432,160.768 380.416,160.768 380.416,94.208"/>
    <path d="M102.912,186.368l35.328,249.856c2.048,15.36,15.36,26.624,30.208,26.624h124.416c15.36,0,28.16-11.264,30.208-26.624L358.4,186.368H102.912z"/>
  </svg>`;
}

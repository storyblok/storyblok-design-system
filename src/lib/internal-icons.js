/**
 * Internal icon paths
 */
const icons = {
  arrow: {
    viewBox: '0 0 5 8',
    path: `
      <g>
        <path
          fill="currentColor"
          d="M5,0 C5.55228475,-1.01453063e-16 6,0.44771525 6,1 L6,5 C6,5.55228475 5.55228475,6 5,6 C4.44771525,6 4,5.55228475 4,5 L3.999,2 L1,2 C0.44771525,2 -2.27366912e-12,1.55228475 -2.27373675e-12,1 C-2.27380439e-12,0.44771525 0.44771525,1.01453063e-16 1,0 L5,0 L5,0 Z"></path>
      </g>
    `
  },
  'fallback-black': {
    viewBox: '0 0 46 46',
    path: `
      <g transform="translate(-85.000000, -803.000000)">
        <g transform="translate(85.000000, 803.000000)">
          <rect id="Rectangle" x="0" y="0" width="46" height="46" rx="23"></rect>
          <g id="Group" transform="translate(9.000000, 15.000000)">
              <circle id="Oval" fill="#FFFFFF" cx="8.5" cy="1.5" r="1.5"></circle>
              <circle id="Oval" fill="#FFFFFF" cx="19.5" cy="1.5" r="1.5"></circle>
              <rect id="Rectangle" fill="#FFFFFF" x="13" y="5" width="2" height="6" rx="1"></rect>
              <path d="M8,14 C10.0833333,16 12.1666667,17 14.25,17 C16.3333333,17 18.4166667,16 20.5,14" id="Path" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <circle id="Oval" fill="#1B243F" opacity="0.0909133185" cx="24" cy="8" r="4"></circle>
              <circle id="Oval" fill="#1B243F" opacity="0.0909133185" cx="4" cy="8" r="4"></circle>
          </g>
        </g>
      </g>
    `
  },
  'fallback-light-green': {
    viewBox: '0 0 26 26',
    path: `
      <g width="26" height="26" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect fill="#00B3B0" x="0" y="0" width="26" height="26" rx="13"/>
          <g transform="translate(5.087 8.478)">
            <circle fill="#FFF" cx="4.804" cy=".848" r="1"/>
            <circle fill="#FFF" cx="11.022" cy=".848" r="1"/>
            <rect fill="#FFF" x="7.348" y="2.826" width="1.13" height="3.391" rx=".565"/>
            <path d="M4.522 7.913c1.177 1.13 2.355 1.696 3.532 1.696 1.178 0 2.355-.566 3.533-1.696" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle fill="#1B243F" opacity=".091" cx="13.565" cy="4.522" r="2.261"/>
            <circle fill="#1B243F" opacity=".091" cx="2.261" cy="4.522" r="2.261"/>
          </g>
        </g>
      </g>`
  },
  'fallback-green': {
    viewBox: '0 0 26 26',
    path: `
      <g width="26" height="26" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect fill="#2DB47D" x="0" y="0" width="26" height="26" rx="13"/>
          <g transform="translate(5.087 8.478)">
            <circle fill="#FFF" cx="4.804" cy=".848" r="1"/>
            <circle fill="#FFF" cx="11.022" cy=".848" r="1"/>
            <rect fill="#FFF" x="7.348" y="2.826" width="1.13" height="3.391" rx=".565"/>
            <path d="M4.522 7.913c1.177 1.13 2.355 1.696 3.532 1.696 1.178 0 2.355-.566 3.533-1.696" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle fill="#1B243F" opacity=".091" cx="13.565" cy="4.522" r="2.261"/>
            <circle fill="#1B243F" opacity=".091" cx="2.261" cy="4.522" r="2.261"/>
          </g>
        </g>
      </g>`
  },
  'fallback-yellow': {
    viewBox: '0 0 26 26',
    path: `
      <g width="26" height="26" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect fill="#FBCE41" x="0" y="0" width="26" height="26" rx="13"/>
          <g transform="translate(5.087 8.478)">
            <circle fill="#FFF" cx="4.804" cy=".848" r="1"/>
            <circle fill="#FFF" cx="11.022" cy=".848" r="1"/>
            <rect fill="#FFF" x="7.348" y="2.826" width="1.13" height="3.391" rx=".565"/>
            <path d="M4.522 7.913c1.177 1.13 2.355 1.696 3.532 1.696 1.178 0 2.355-.566 3.533-1.696" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle fill="#1B243F" opacity=".091" cx="13.565" cy="4.522" r="2.261"/>
            <circle fill="#1B243F" opacity=".091" cx="2.261" cy="4.522" r="2.261"/>
          </g>
        </g>
      </g>`
  },
  'fallback-blue': {
    viewBox: '0 0 26 26',
    path: `
      <g width="26" height="26" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect fill="#395ECE" x="0" y="0" width="26" height="26" rx="13"/>
          <g transform="translate(5.087 8.478)">
            <circle fill="#FFF" cx="4.804" cy=".848" r="1"/>
            <circle fill="#FFF" cx="11.022" cy=".848" r="1"/>
            <rect fill="#FFF" x="7.348" y="2.826" width="1.13" height="3.391" rx=".565"/>
            <path d="M4.522 7.913c1.177 1.13 2.355 1.696 3.532 1.696 1.178 0 2.355-.566 3.533-1.696" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle fill="#1B243F" opacity=".091" cx="13.565" cy="4.522" r="2.261"/>
            <circle fill="#1B243F" opacity=".091" cx="2.261" cy="4.522" r="2.261"/>
          </g>
        </g>
      </g>`
  },
  'chevron-down': {
    viewBox: '0 0 16 16',
    path: `
      <g width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.293 10.536a1 1 0 001.414 0l2.829-2.829a1 1 0 10-1.415-1.414L8 8.414 5.879 6.293a1 1 0 10-1.415 1.414l2.829 2.829z" fill="currentColor" stroke="none" stroke-width="1" fill-rule="evenodd"/>
      </g>`
  },
  'chevron-left': {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-291 -1408)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M296.464 1415.293a1 1 0 000 1.414l2.829 2.829a1 1 0 101.414-1.415l-2.121-2.121 2.121-2.121a1 1 0 10-1.414-1.415l-2.829 2.829z" fill="currentColor"/>
    </g>`
  },
  'chevron-right': {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-433 -1408)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M443.536 1415.293a1 1 0 010 1.414l-2.829 2.829a1 1 0 11-1.414-1.415l2.12-2.122-2.12-2.12a1 1 0 111.414-1.415l2.829 2.829z" fill="currentColor"/>
    </g>`
  },
  'chevron-up': {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-575 -1408)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M583.707 1413.464a1 1 0 00-1.414 0l-2.829 2.829a1 1 0 101.415 1.414l2.121-2.121 2.121 2.121a1 1 0 101.415-1.414l-2.829-2.829z" fill="currentColor"/>
    </g>`
  },
  'chevron-sort': {
    viewBox: '0 0 16 22',
    path: `
    <g transform="translate(-717 -1405)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g fill="currentColor"><path d="M725.707 1410.464a1 1 0 00-1.414 0l-2.829 2.829a1 1 0 101.415 1.414l2.121-2.121 2.121 2.121a1 1 0 101.415-1.414l-2.829-2.829zM724.293 1421.536a1 1 0 001.414 0l2.829-2.829a1 1 0 10-1.415-1.414l-2.121 2.121-2.121-2.121a1 1 0 10-1.415 1.414l2.829 2.829z"/>
      </g>
    </g>`
  },
  search: {
    viewBox: '0 0 19 20',
    path: `
    <g transform="translate(-858 -1407)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M862.047 1411.259a5.5 5.5 0 018.616 6.702l2.54 2.54a1 1 0 11-1.414 1.415l-2.448-2.448a5.5 5.5 0 01-7.294-8.21zm1.296 1.296a3.667 3.667 0 105.185 5.186 3.667 3.667 0 00-5.185-5.186z" fill="currentColor"/>
    </g>`
  },
  close: {
    viewBox: '0 0 18 18',
    path: `
    <g transform="translate(-1000 -1407)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M1013.243 1411.757a1 1 0 010 1.415l-2.829 2.828 2.829 2.828a1 1 0 01-1.415 1.415l-2.828-2.829-2.828 2.829a1 1 0 01-1.415-1.415l2.829-2.828-2.829-2.828a1 1 0 111.415-1.415l2.828 2.829 2.828-2.829a1 1 0 011.415 0z" fill="currentColor"/>
    </g>`
  },
  folder: {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-1143 -1408)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M1148.987 1412l1.425 1.364.242.236H1156v6.4h-10v-8h2.987m-.402-2H1145a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-8a1 1 0 00-1-1h-6l-1.705-1.705a1 1 0 00-.71-.295z" fill="currentColor"/>
    </g>`
  },
  calendar: {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-149 -1550)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M159 1551a1 1 0 011 1h2a2 2 0 012 2v9a2 2 0 01-2 2h-10a2 2 0 01-2-2v-9a2 2 0 012-2h2a1 1 0 112 0h2a1 1 0 011-1zm-7 7v5h10v-5h-10zm0-2h10v-2h-2a1 1 0 01-2 0h-2a1 1 0 11-2 0h-2v2z" fill="currentColor"/>
    </g>`
  },
  plus: {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-291 -1550)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M299 1554a1 1 0 011 1v2h2a1 1 0 010 2h-2v2a1 1 0 01-2 0v-2h-2a1 1 0 110-2h2v-2a1 1 0 011-1z" fill="currentColor"/>
    </g>`
  },
  substract: {
    viewBox: '0 0 16 16',
    path: `
    <g transform="translate(-433 -1550)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="4" y="7" width="8" height="2" rx="1" transform="translate(433 1550)" fill="currentColor"/>
    </g>`
  },
  checkmark: {
    viewBox: '0 0 16 16',
    path: `
      <g transform="translate(-575 -1550)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M586.611 1555.27l.008.009c.37.374.37.977 0 1.352l-4.004 4.054a.934.934 0 01-.496.264l-.11.013-.111.001a.935.935 0 01-.618-.278l-2.003-2.027a.962.962 0 010-1.352.938.938 0 011.327-.008l.008.008 1.335 1.351 3.337-3.378a.938.938 0 011.327-.008z" fill="currentColor"/>
      </g>
    `
  },
  'overflow-menu-vertic': {
    viewBox: '0 0 16 16',
    path: `
      <g transform="translate(-717 -1550)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M725 1561.733a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2zm0-5.333a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2zm0-5.333a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2z" fill="currentColor"/>
      </g>
    `
  },
  'status-circle': {
    viewBox: '0 0 16 16',
    path: `
      <g transform="translate(-859 -1550)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle fill="currentColor" cx="8" cy="8" r="3" transform="translate(859 1550)"/>
      </g>
    `
  },
  'success-pictogram': {
    viewBox: '0 0 48 48',
    path: `
      <g width="48" height="48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g fill="#00B3B0" stroke="none" stroke-width="1" fill-rule="evenodd">
          <circle opacity=".15" cx="24" cy="24" r="24"/>
          <path d="M31.222 18.541l.017.017c.74.749.74 1.954 0 2.703l-8.01 8.11a1.869 1.869 0 01-1.163.55l-.16.008a1.87 1.87 0 01-1.346-.558l-4.005-4.055a1.923 1.923 0 010-2.703 1.876 1.876 0 012.653-.017l.017.017 2.669 2.702 6.675-6.757a1.876 1.876 0 012.653-.017z"/>
        </g>
      </g>`
  },
  'upload-pictogram': {
    viewBox: '0 0 48 48',
    path: `
      <g width="48" height="48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g fill="#00B3B0" stroke="none" stroke-width="1" fill-rule="evenodd">
          <circle cx="24" cy="24" r="24" opacity=".15"/>
          <rect x="22" y="15" width="4" height="13" rx="2"/>
          <path d="M22.674 31.754c.732.732 1.92.732 2.652 0l5.303-5.303a1.875 1.875 0 00-2.652-2.652L24 27.777l-3.977-3.978a1.875 1.875 0 10-2.652 2.652l5.303 5.303z"/>
        </g>
      </g>`
  },
  'delete-pictogram': {
    viewBox: '0 0 48 48',
    path: `
      <g width="48" height="48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g fill="#FF6159" stroke="none" stroke-width="1" fill-rule="evenodd">
          <circle opacity=".15" cx="24" cy="24" r="24"/>
          <path d="M15.104 34.773C15.187 36.025 16.28 37 17.6 37h12.802c1.32 0 2.412-.975 2.495-2.227L34 18H14l1.104 16.773z" opacity=".5"/>
          <path d="M28 11a1 1 0 011 1v1h6a1 1 0 011 1v1a1 1 0 01-1 1H13a1 1 0 01-1-1v-1a1 1 0 011-1h6v-1a1 1 0 011-1h8z"/>
        </g>
      </g>`
  },
  warning: {
    viewBox: '0 0 16 16',
    path: `
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M0 0h16v16H0z"/>
        <path d="M8.894 4.789l3.382 6.764A1 1 0 0111.382 13H4.618a1 1 0 01-.894-1.447l3.382-6.764a1 1 0 011.788 0z" fill="currentColor"/>
      </g>
    `
  },
  info: {
    viewBox: '0 0 16 16',
    path: `
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M0 0h16v16H0z"/>
        <path d="M0 0h16v16H0z"/>
        <g>
          <g transform="translate(7 4)" fill="currentColor">
            <circle cx="1" cy="1" r="1"/>
            <rect x="0" y="3" width="2" height="5" rx="1"/>
          </g>
        </g>
      </g>
    `
  }
}

export default icons

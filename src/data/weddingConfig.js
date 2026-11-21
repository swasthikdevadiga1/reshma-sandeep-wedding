// Single source of truth for the invitation's content.
// Edit the values below and the whole site updates.
export const wedding = {
  bride: 'Reshma',
  groom: 'Sandeep',
  monogram: { left: 'R', right: 'S' },

  // ---- Cover screen ----
  intro: 'Together with our families',
  subtitle: 'Wedding Ceremony',
  tagline: 'A little invitation, made with love',
  buttonLabel: 'Open Invitation',
  hint: 'Tap to begin',
  message: 'Two hearts, one beautiful beginning.',
  cueLabel: 'Explore date & venue',
  scrollLabels: {
    date: 'View the date',
    venue: 'View the venue',
  },

  // ---- Welcome page ----
  welcome: {
    greeting: 'ಸ್ವಾಗತ',
    title: 'You are warmly invited',
    paragraphs: [
      'With the blessings of our elders and the love of our families, we joyfully invite you to be part of the most beautiful day of our lives.',
      'Your presence, your blessings and your warm wishes will make our celebration complete. Come share in the laughter, the traditions and the togetherness.',
    ],
    signoff: 'With love, Reshma & Sandeep and families',
  },

  // ---- Date page ----
  date: {
    iso: '2026-12-06T00:00:00+05:30', // used for the countdown (IST)
    day: '06',
    weekday: 'Sunday',
    monthYear: 'December 2026',
    time: '', // add later, e.g. 'Muhurtham at 10:30 AM'. Hidden while empty.
    title: 'Save the date',
  },

  // ---- Venue page ----
  venue: {
    title: 'Join us at',
    nameKn: 'ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಕಲ್ಯಾಣ ಮಂಟಪ',
    nameEn: 'Sri Durgaparameshwari Kalyana Mantapa',
    address: 'Tekkatte, Kundapura', // add later, e.g. 'Village, Taluk, District'
    mapsLink: 'https://share.google/olo8FadQENaSi8Kpv', // "Get Directions" button
    mapQuery: 'Sri Durgaparameshwari Kalyana Mantapa', // used for the embedded map
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.724268157354!2d74.69838557600431!3d13.552498886818551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc91682f97964f%3A0x1b0c6af9187dd44c!2z4LK24LON4LKw4LOAIOCypuCzgeCysOCzjeCyl-CyvuCyquCysOCyruCzh-CytuCzjeCyteCysOCyvyDgspXgsrLgs43gsq_gsr7gsqMg4LKu4LKC4LKf4LKqIFNyaSBEdXJnYXBhcmFtZXNod2FyaSBLYWx5YW5hIE1hbnRhcGE!5e0!3m2!1sen!2sin!4v1795255688218!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin', 
    directionsLabel: 'Get Directions',
    closing: 'We can’t wait to celebrate with you.',
  },

  // ---- Music ----
  // Leave `src` empty to use the built-in warm instrumental (synthesised in the
  // browser). To use your own track, put an mp3 in /public and set src: '/music.mp3'.
  music: { src: './song.mp3', volume: 0.5 },
};

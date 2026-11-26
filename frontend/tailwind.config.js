export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { bg: '#F7FAF7', line: '#DEE8DF', brand: '#257A50', mint: '#DCF4DF', pale: '#EFF8EF', ink: '#243C32', body: '#4B6155',
      muted: '#66786E', fog: '#F0F3F0', off: '#E2E9E3', offtext: '#829187', warn: '#9B5423', warnbg: '#FFF3E6',
      danger: '#A43E37', dangerbg: '#FFF4F2', dangerline: '#E5B9B2' },
    fontFamily: { nunitoSans: ['"Nunito Sans"', 'sans-serif'], inter: ['Inter', 'sans-serif'] },
  } },
};

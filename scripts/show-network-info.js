const os = require('os');

function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  return 'localhost';
}

const networkIP = getNetworkIP();
const port = process.env.PORT || 3000;

console.log('\n🚀 Development server started!');
console.log(`📱 Test on mobile: http://${networkIP}:${port}`);
console.log(`💻 Local access: http://localhost:${port}\n`);
export const commands: { [key: string]: string } = {
  ls: 'List directory contents',
  cd: 'Change directory',
  pwd: 'Print working directory',
  cat: 'Concatenate and display file contents',
  grep: 'Search for patterns in files',
  chmod: 'Change file permissions',
  ssh: 'Secure shell remote login',
  nmap: 'Network exploration and security auditing',
  ping: 'Send ICMP echo request to network hosts',
  ifconfig: 'Configure network interface parameters',
  netstat: 'Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships',
  tcpdump: 'Dump traffic on a network',
  wireshark: 'Interactively analyze network traffic',
  mission: 'Display current mission objectives',
  clear: 'Clear the terminal screen',
  exit: 'Exit the game',
  decode: 'Decode an encoded message',
};

export const tools: { [key: string]: string } = {
  shodan: 'Search engine for Internet-connected devices',
  maltego: 'Interactive data mining tool',
  theHarvester: 'Gather emails, subdomains, hosts, employee names, open ports and banners from different public sources',
  reconNg: 'Full-featured Web Reconnaissance framework',
  nmap: 'Network exploration and security auditing',
  metasploit: 'Penetration testing framework',
  wireshark: 'Network protocol analyzer',
  burpsuite: 'Web application security testing',
  aircrackNg: 'Complete suite for auditing wireless networks',
  sqlmap: 'Automatic SQL injection and database takeover tool',
};

export const fileSystem: { [key: string]: string | { [key: string]: string } } = {
  '/': {
    'home': {
      'user': {
        'documents': {
          'secret.txt': 'VGhlIGtleSB0byB0aGUgbmV4dCBsZXZlbCBpczogQ2ljYWRhMzMwMQ==',
          'todo.txt': '1. Check server logs\n2. Update firewall rules\n3. Investigate suspicious IP: 192.168.1.100',
        },
        'downloads': {
          'mysterious_image.jpg': '[Binary data]',
        },
      },
    },
    'etc': {
      'passwd': 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:User,,,:/home/user:/bin/bash',
    },
    'var': {
      'log': {
        'auth.log': '... Failed login attempt from 10.0.0.5 ...',
      },
    },
  },
};

export const missions: { [key: string]: { description: string; objectives: string[]; reward: number } } = {
  1: {
    description: "Welcome, recruit. Your first mission is to familiarize yourself with the system and find a hidden message.",
    objectives: [
      "Use 'ls' to list the contents of the current directory",
      "Navigate to the 'documents' folder using 'cd'",
      "Use 'cat' to read the contents of 'secret.txt'",
      "Decode the message using the 'decode' command",
    ],
    reward: 100,
  },
  2: {
    description: "Good job on your first mission. Now, let's do some basic reconnaissance on a target system.",
    objectives: [
      "Use 'nmap' to scan the IP address 192.168.1.100",
      "Check the 'auth.log' file in the '/var/log' directory for any suspicious activity",
      "Use 'grep' to search for 'Failed login' in the auth.log file",
    ],
    reward: 150,
  },
  // Add more missions as needed
};

export const decodeBase64 = (str: string): string => {
  try {
    return atob(str);
  } catch {
    return "Failed to decode. Make sure the input is valid Base64.";
  }
};
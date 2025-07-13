# .jules-setup.sh
#!/bin/bash

# Install Node.js dependencies
npm install

# Install specific testing dependencies
npm install jest fs-extra --save-dev

# Set file permissions (if needed)
chmod +x scripts/*.sh

#!/bin/bash
npm install
npm install -D tailwindcss @tailwindcss/forms @tailwindcss/typography

#!/bin/bash

# Update imports from old location to new location
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/lib/utils/i18n/translations|@/lib/i18n|g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/translations|@/lib/i18n|g'

echo "Updated translation imports to use @/lib/i18n" 
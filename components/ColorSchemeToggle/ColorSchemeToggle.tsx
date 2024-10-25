'use client';

import { useEffect, useState } from 'react';
import { Switch, useMantineTheme, rem } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures component is mounted before rendering switch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering on the server
  if (!mounted) return null;

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={colorScheme === 'dark'}
      onChange={() => toggleColorScheme()}
    />
  );
}

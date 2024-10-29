'use client';

import { SetStateAction, useState } from 'react';
import { Container, Group, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './HeaderSimple.module.css';

interface Link {
  link: string;
  label: string;
}

const links: Link[] = [
  { link: '/', label: 'Explorer' },
  { link: '/income-visualizer', label: 'Income Visualizer' },
  { link: '/about', label: 'About' },
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<string>(links[0].link);

  const handleLinkClick = (link: SetStateAction<string>) => {
    setActive(link);
    close();
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={`${classes.link} ${active === link.link ? classes.active : ''}`}
      onClick={() => handleLinkClick(link.link)}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <h1>MTA Open Data Challenge Submission</h1>

        <Group gap={5} visibleFrom="sm"> {/* Only visible on larger screens */}
          {items}
        </Group>

        <ColorSchemeToggle />

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        {/* Drawer for mobile links */}
        <Drawer opened={opened} onClose={close} title="Menu" padding="md" size="xs">
          <div className={classes.mobileLinks}>
            {items}
          </div>
        </Drawer>
      </Container>
    </header>
  );
}

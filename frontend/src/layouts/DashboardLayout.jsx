import { Outlet, useLocation } from 'react-router-dom';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import HeaderNav from '../components/layout/HeaderNav';
import SidebarNav from '../components/layout/SidebarNav';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function DashboardLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderNav
          burger={
            <Group wrap="nowrap">
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            </Group>
          }
        />
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <SidebarNav />
      </AppShell.Navbar>

      <AppShell.Main bg="var(--mantine-color-gray-0)">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          <Outlet />
        </motion.div>
      </AppShell.Main>
    </AppShell>
  );
}

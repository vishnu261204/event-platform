import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import HeaderNav from '../components/layout/HeaderNav';
import FooterSection from '../components/layout/Footer';

export default function PublicLayout() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <HeaderNav />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
        <FooterSection />
      </AppShell.Main>
    </AppShell>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Paper, Title, Text, TextInput, Textarea, Select, NumberInput, Button, Group, SimpleGrid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import { IconCurrencyDollar, IconUsers, IconPhoto } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.date({ required_error: 'Date is required' }),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.number({ required_error: 'Price is required' }).min(0, 'Price cannot be negative'),
  totalTickets: z.number({ required_error: 'Total tickets is required' }).min(1, 'At least 1 ticket'),
});

const categories = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Music', label: 'Music' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Business', label: 'Business' },
  { value: 'Art', label: 'Art' },
  { value: 'Food', label: 'Food & Drink' },
  { value: 'Other', label: 'Other' },
];

const sampleEvent = {
  title: 'Summer Music Festival',
  description: 'A spectacular outdoor music festival featuring top artists from around the world.',
  category: 'Music',
  date: new Date('2026-07-15'),
  time: '14:00',
  location: 'Central Park, New York',
  price: 85,
  totalTickets: 500,
};

export default function EditEvent() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: sampleEvent,
  });

  const onSubmit = () => {
    notifications.show({ title: 'Success', message: 'Event updated successfully!', color: 'green' });
    navigate('/organizer/events');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">Edit Event</Title>

      <Paper withBorder shadow="sm" p="xl" radius="md" maw={720} mx="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Event Title" placeholder="Enter event title" error={errors.title?.message} {...register('title')} mb="md" />

          <Textarea label="Description" placeholder="Describe your event..." error={errors.description?.message} {...register('description')} mb="md" rows={4} />

          <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  placeholder="Select category"
                  data={categories}
                  error={errors.category?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <TextInput label="Location" placeholder="Event location" error={errors.location?.message} {...register('location')} />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DateInput
                  label="Date"
                  placeholder="Select date"
                  error={errors.date?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <TextInput label="Time" placeholder="e.g. 14:00" error={errors.time?.message} {...register('time')} />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Ticket Price"
                  placeholder="0 for free"
                  leftSection={<IconCurrencyDollar size={16} />}
                  error={errors.price?.message}
                  value={field.value}
                  onChange={field.onChange}
                  min={0}
                />
              )}
            />
            <Controller
              name="totalTickets"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Total Tickets"
                  placeholder="Number of tickets"
                  leftSection={<IconUsers size={16} />}
                  error={errors.totalTickets?.message}
                  value={field.value}
                  onChange={field.onChange}
                  min={1}
                />
              )}
            />
          </SimpleGrid>

          <Text size="sm" fw={500} mb={4}>Event Image</Text>
          <Dropzone onDrop={() => {}} mb="lg">
            <Group justify="center" py="xl">
              <IconPhoto size={40} />
              <div>
                <Text size="sm">Drag image here or click to upload</Text>
                <Text size="xs" c="dimmed">PNG, JPG up to 5MB</Text>
              </div>
            </Group>
          </Dropzone>

          <Group pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
            <Button type="submit">Save Changes</Button>
            <Button variant="default" onClick={() => navigate('/organizer/events')}>Cancel</Button>
          </Group>
        </form>
      </Paper>
    </motion.div>
  );
}

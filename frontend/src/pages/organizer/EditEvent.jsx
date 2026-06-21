import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Paper, Title, Text, TextInput, Textarea, Select, NumberInput, Button, Group, SimpleGrid, Image, ActionIcon, Box, Skeleton, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import { IconCurrencyDollar, IconUsers, IconPhoto, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { eventAPI } from '../../services/api';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.date({ required_error: 'Date is required' }),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(1, 'Location is required'),
  price: z.number({ required_error: 'Price is required' }).min(0, 'Price cannot be negative'),
  totalSeats: z.number({ required_error: 'Total tickets is required' }).min(1, 'At least 1 ticket'),
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

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingBanner, setExistingBanner] = useState(null);

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    eventAPI.getById(id)
      .then((res) => {
        const event = res.data.data.event;
        reset({
          title: event.title || '',
          description: event.description || '',
          category: event.category || '',
          date: event.date ? new Date(event.date) : null,
          time: event.time || '',
          venue: event.venue || event.location || '',
          price: event.price || 0,
          totalSeats: event.totalSeats || 1,
        });
        if (event.banner) setExistingBanner(event.banner);
      })
      .catch(() => {
        notifications.show({ title: 'Error', message: 'Failed to load event', color: 'red' });
        navigate('/organizer/events');
      })
      .finally(() => setLoading(false));
  }, [id, reset, navigate]);

  const onDrop = useCallback((acceptedFiles) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setExistingBanner(null);
  }, []);

  const removeImage = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setExistingBanner(null);
  };

  const onSubmit = async (formData) => {
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('category', formData.category);
      fd.append('venue', formData.venue);
      fd.append('date', formData.date.toISOString());
      fd.append('time', formData.time);
      fd.append('price', formData.price);
      fd.append('totalSeats', formData.totalSeats);
      if (file) fd.append('banner', file);

      await eventAPI.update(id, fd);
      notifications.show({ title: 'Success', message: 'Event updated successfully!', color: 'green' });
      navigate('/organizer/events');
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err.response?.data?.message || 'Failed to update event',
        color: 'red',
      });
    }
  };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Skeleton height={36} width={200} radius="md" mb="lg" />
        <Paper withBorder shadow="sm" p="xl" radius="md" maw={720} mx="auto">
          <Stack gap="md">
            <Skeleton height={36} radius="sm" />
            <Skeleton height={80} radius="sm" />
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Skeleton height={36} radius="sm" />
              <Skeleton height={36} radius="sm" />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Skeleton height={36} radius="sm" />
              <Skeleton height={36} radius="sm" />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Skeleton height={36} radius="sm" />
              <Skeleton height={36} radius="sm" />
            </SimpleGrid>
            <Skeleton height={180} radius="sm" />
            <Skeleton height={36} width={160} radius="sm" />
          </Stack>
        </Paper>
      </motion.div>
    );
  }

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const bannerUrl = existingBanner ? `${API_URL.replace('/api', '')}${existingBanner}` : null;

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
            <TextInput label="Location" placeholder="Event location" error={errors.venue?.message} {...register('venue')} />
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
              name="totalSeats"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Total Tickets"
                  placeholder="Number of tickets"
                  leftSection={<IconUsers size={16} />}
                  error={errors.totalSeats?.message}
                  value={field.value}
                  onChange={field.onChange}
                  min={1}
                />
              )}
            />
          </SimpleGrid>

          <Text size="sm" fw={500} mb={4}>Event Banner</Text>
          {(preview || bannerUrl) ? (
            <Box mb="md" style={{ position: 'relative', display: 'inline-block' }}>
              <Image src={preview || bannerUrl} radius="md" h={180} w="auto" fit="cover" alt="Banner" />
              <ActionIcon
                variant="filled"
                color="red"
                size="sm"
                radius="xl"
                style={{ position: 'absolute', top: 8, right: 8 }}
                onClick={removeImage}
              >
                <IconX size={14} />
              </ActionIcon>
            </Box>
          ) : (
            <Dropzone onDrop={onDrop} accept={['image/png', 'image/jpeg', 'image/webp']} mb="md" maxSize={5 * 1024 * 1024}>
              <Group justify="center" py="xl">
                <IconPhoto size={40} />
                <div>
                  <Text size="sm">Drag image here or click to upload</Text>
                  <Text size="xs" c="dimmed">PNG, JPG, WebP up to 5MB</Text>
                </div>
              </Group>
            </Dropzone>
          )}

          <Group pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
            <Button type="submit" loading={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="default" onClick={() => navigate('/organizer/events')}>Cancel</Button>
          </Group>
        </form>
      </Paper>
    </motion.div>
  );
}

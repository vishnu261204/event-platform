import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import FileUploader from '../../components/ui/FileUploader';
import PageHeader from '../../components/ui/PageHeader';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.string().min(1, 'Price is required'),
  totalTickets: z.string().min(1, 'Total tickets is required'),
});

const categoryOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Music', label: 'Music' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Business', label: 'Business' },
  { value: 'Art', label: 'Art' },
  { value: 'Food', label: 'Food & Drink' },
  { value: 'Other', label: 'Other' },
];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '', description: '', category: '', date: '', time: '', location: '', price: '', totalTickets: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Event created:', { ...data, image });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Create New Event" description="Fill in the details to create your event" />

      <Card className="max-w-3xl mx-auto mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input label="Event Title" placeholder="Enter event title" error={errors.title?.message} {...register('title')} />

          <Textarea label="Description" placeholder="Describe your event..." error={errors.description?.message} {...register('description')} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  placeholder="Select category"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={categoryOptions}
                  error={errors.category?.message}
                />
              )}
            />
            <Input label="Location" placeholder="Event location" error={errors.location?.message} {...register('location')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Date" type="date" error={errors.date?.message} {...register('date')} />
            <Input label="Time" type="time" error={errors.time?.message} {...register('time')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Ticket Price ($)" type="number" placeholder="0 for free" error={errors.price?.message} {...register('price')} />
            <Input label="Total Tickets" type="number" placeholder="Number of tickets" error={errors.totalTickets?.message} {...register('totalTickets')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5">Event Image</label>
            <FileUploader onUpload={(files) => setImage(files[0])} maxFiles={1} />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <Button type="submit" size="lg">Create Event</Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/organizer/events')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}

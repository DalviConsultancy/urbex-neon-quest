-- Create visited_locations table to track user visits
CREATE TABLE public.visited_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  location_id TEXT NOT NULL,
  location_name TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(user_id, location_id)
);

-- Enable RLS
ALTER TABLE public.visited_locations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own visited locations"
ON public.visited_locations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own visited locations"
ON public.visited_locations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visited locations"
ON public.visited_locations
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own visited locations"
ON public.visited_locations
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update profile locations_visited count
CREATE OR REPLACE FUNCTION public.update_locations_visited_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET locations_visited = (
    SELECT COUNT(*)
    FROM public.visited_locations
    WHERE user_id = NEW.user_id
  )
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

-- Create trigger to update count when a new location is visited
CREATE TRIGGER update_profile_locations_count
AFTER INSERT ON public.visited_locations
FOR EACH ROW
EXECUTE FUNCTION public.update_locations_visited_count();
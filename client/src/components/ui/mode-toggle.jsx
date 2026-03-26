import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-provider';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    // Determine current applied theme (light or dark)
    const appliedTheme = (() => {
        if (theme === 'light') return 'light';
        if (theme === 'dark') return 'dark';
        // If system theme, check system's preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    })();

    // Handle the toggle
    const toggleTheme = () => {
        if (appliedTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <Button onClick={toggleTheme} variant="outline" size="icon">
            {appliedTheme === 'dark' ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
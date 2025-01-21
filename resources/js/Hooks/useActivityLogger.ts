import { router } from '@inertiajs/react';

const useActivityLogger = () => {

    const logActivity = async (
        reference_id: number,  
        action: string,
        description: string,
       
    ) => {
      const logActivityUrl = '/api/v1/activities/enroll';
      try {
        router.post(logActivityUrl, { reference_id, action, description }, {
            onSuccess: () => {
                console.log('Activity logged successfully.');
            },
            onError: (error) => {
                console.error('Error logging activity:', error);
            },
        } )
        
      } catch (error) {
        console.error('Unexpected error logging activity:', error);
      }
    };
  
    return { logActivity };
  };
  
  export default useActivityLogger;